module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step-definitions/**/*.ts', 'utils/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:test-outputs/cucumber-report/report.html',
      'json:test-outputs/cucumber-report/report.json',
    ],
    publishQuiet: true,
  },
};
