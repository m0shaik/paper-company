#!/usr/bin/env node

/**
 * SEO Configuration Management Script
 *
 * This script helps manage and validate SEO configurations
 * Run with: node scripts/seo-manager.js [command]
 */

const fs = require('fs');
const path = require('path');

const SEO_CONFIG_PATH = path.join(__dirname, '../app/lib/seo-config.ts');

// Commands
const commands = {
  validate: validateSEOConfig,
  list: listPages,
  add: addPage,
  help: showHelp,
};

function main() {
  const command = process.argv[2] || 'help';

  if (commands[command]) {
    commands[command]();
  } else {
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
  }
}

function validateSEOConfig() {
  console.log('🔍 Validating SEO Configuration...\n');

  if (!fs.existsSync(SEO_CONFIG_PATH)) {
    console.error('❌ SEO config file not found!');
    return;
  }

  try {
    const configContent = fs.readFileSync(SEO_CONFIG_PATH, 'utf8');

    // Basic validation checks
    const checks = [
      {
        name: 'Has site configuration',
        test: configContent.includes('site: {'),
      },
      {
        name: 'Has social media links',
        test: configContent.includes('social: {'),
      },
      {
        name: 'Has page configurations',
        test: configContent.includes('pages: {'),
      },
      {
        name: 'Has template configurations',
        test: configContent.includes('templates: {'),
      },
      {
        name: 'Has default keywords',
        test: configContent.includes('defaultKeywords: ['),
      },
    ];

    checks.forEach((check) => {
      const status = check.test ? '✅' : '❌';
      console.log(`${status} ${check.name}`);
    });

    console.log('\n📊 Configuration Summary:');

    // Count pages
    const pagesMatch = configContent.match(/pages: \{([\s\S]*?)\}/);
    if (pagesMatch) {
      const pagesContent = pagesMatch[1];
      const pageCount = (pagesContent.match(/\w+: \{/g) || []).length;
      console.log(`   📄 Static pages configured: ${pageCount}`);
    }

    // Count templates
    const templatesMatch = configContent.match(/templates: \{([\s\S]*?)\}/);
    if (templatesMatch) {
      const templatesContent = templatesMatch[1];
      const templateCount = (templatesContent.match(/\w+: \{/g) || []).length;
      console.log(`   🏗️  Dynamic templates configured: ${templateCount}`);
    }

    console.log('\n✨ Validation complete!');
  } catch (error) {
    console.error('❌ Error reading SEO config:', error.message);
  }
}

function listPages() {
  console.log('📋 Configured SEO Pages:\n');

  try {
    const configContent = fs.readFileSync(SEO_CONFIG_PATH, 'utf8');

    // Extract pages section
    const pagesMatch = configContent.match(
      /pages: \{([\s\S]*?)\},\s*\/\/ Template/
    );
    if (pagesMatch) {
      const pagesContent = pagesMatch[1];
      const pageMatches = pagesContent.match(
        /(\w+): \{[\s\S]*?title: ['"`](.*?)['"`]/g
      );

      if (pageMatches) {
        pageMatches.forEach((match) => {
          const [, pageName, title] = match.match(
            /(\w+): \{[\s\S]*?title: ['"`](.*?)['"`]/
          );
          console.log(`📄 ${pageName}: ${title}`);
        });
      }
    }

    // Extract templates section
    console.log('\n🏗️ Dynamic Templates:\n');
    const templatesMatch = configContent.match(/templates: \{([\s\S]*?)\}/);
    if (templatesMatch) {
      const templatesContent = templatesMatch[1];
      const templateMatches = templatesContent.match(/(\w+): \{/g);

      if (templateMatches) {
        templateMatches.forEach((match) => {
          const [, templateName] = match.match(/(\w+): \{/);
          console.log(`🏗️  ${templateName}`);
        });
      }
    }
  } catch (error) {
    console.error('❌ Error reading pages:', error.message);
  }
}

function addPage() {
  const pageName = process.argv[3];
  const pageTitle = process.argv[4];
  const pageDescription = process.argv[5];
  const pageUrl = process.argv[6];

  if (!pageName || !pageTitle || !pageDescription || !pageUrl) {
    console.log('📝 Add a new page configuration:\n');
    console.log(
      'Usage: node scripts/seo-manager.js add <name> <title> <description> <url>'
    );
    console.log('');
    console.log('Example:');
    console.log(
      '  node scripts/seo-manager.js add about "About Us" "Learn about our company" "/about"'
    );
    return;
  }

  console.log('🚧 This feature is coming soon!');
  console.log(
    'For now, manually add the page configuration to app/lib/seo-config.ts'
  );
  console.log('');
  console.log('Add this to the pages section:');
  console.log(`${pageName}: {`);
  console.log(`  title: '${pageTitle}',`);
  console.log(`  description: '${pageDescription}',`);
  console.log(`  keywords: [/* add relevant keywords */],`);
  console.log(`  url: '${pageUrl}',`);
  console.log(`  image: '/images/hero-background.avif'`);
  console.log(`},`);
}

function showHelp() {
  console.log('🎯 SEO Configuration Manager\n');
  console.log('Available commands:');
  console.log('  validate  - Validate the SEO configuration file');
  console.log('  list      - List all configured pages and templates');
  console.log('  add       - Add a new page configuration (interactive)');
  console.log('  help      - Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/seo-manager.js validate');
  console.log('  node scripts/seo-manager.js list');
  console.log(
    '  node scripts/seo-manager.js add about "About Us" "Learn about us" "/about"'
  );
}

if (require.main === module) {
  main();
}

module.exports = { validateSEOConfig, listPages, addPage, showHelp };
