'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeLineItemsFromCurrentCart, addToCurrentCart, updateCurrentCart, LineItem } from '@/app/model/ecom/ecom-api';
import { STORES_APP_ID } from '@/app/constants';

export const useUpdateCartItemDimensions = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const queryClient = useQueryClient();

    const removeItemMutation = useMutation({
        mutationFn: (itemId: string) => removeLineItemsFromCurrentCart([itemId]),
        onSuccess: (data) => {
            queryClient.setQueryData(["cart"], data.cart);
        },
    });

    const addItemMutation = useMutation({
        mutationFn: (item: LineItem) => addToCurrentCart({ lineItems: [item] }),
        onSuccess: async (data) => {
            queryClient.setQueryData(["cart"], data.cart);
            if (!data?.cart?.overrideCheckoutUrl) {
                await updateCurrentCart({
                    cartInfo: {
                        overrideCheckoutUrl: `${window.location.origin}/api/redirect-to-checkout?checkoutId={checkoutId}`,
                    },
                });
            }
        },
    });

    const updateDimensions = async (
        item: LineItem,
        newWidth: number,
        newHeight: number
    ) => {
        setIsUpdating(true);

        try {
            const newArea = newWidth * newHeight;
            const newQuantity = Math.ceil(newArea);

            // Optimistic update: immediately update the cache with the new item
            const optimisticItem = {
                ...item,
                quantity: newQuantity,
                catalogReference: {
                    ...item.catalogReference!,
                    options: {
                        ...item.catalogReference?.options,
                        customTextFields: {
                            Height: `${newHeight} ft`,
                            Width: `${newWidth} ft`,
                            Area: `${newArea.toFixed(2)} sq ft`,
                        },
                    },
                },
            };

            // Update cache optimistically
            const previousCart = queryClient.getQueryData(["cart"]);
            queryClient.setQueryData(["cart"], (oldData: any) => {
                if (!oldData?.lineItems) return oldData;
                return {
                    ...oldData,
                    lineItems: oldData.lineItems.map((lineItem: any) =>
                        lineItem._id === item._id ? optimisticItem : lineItem
                    ),
                };
            });

            // Perform the actual operations
            await removeItemMutation.mutateAsync(item._id!);
            await addItemMutation.mutateAsync({
                quantity: newQuantity,
                catalogReference: {
                    catalogItemId: item.catalogReference!.catalogItemId!,
                    appId: STORES_APP_ID,
                    options: {
                        ...item.catalogReference?.options,
                        customTextFields: {
                            Height: `${newHeight} ft`,
                            Width: `${newWidth} ft`,
                            Area: `${newArea.toFixed(2)} sq ft`,
                        },
                    },
                },
            });

            return { success: true, newQuantity, newArea };
        } catch (error) {
            console.error('Failed to update dimensions:', error);
            // Revert optimistic update on error
            queryClient.invalidateQueries(["cart"]);
            return { success: false, error };
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        updateDimensions,
        isUpdating: isUpdating || removeItemMutation.isPending || addItemMutation.isPending,
    };
};
