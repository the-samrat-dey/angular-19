module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // feature
        'fix',  // fix
        'docs', // documentation
        'style', // style changes (formatting, etc.)
        'refactor', // refactor
        'test', // tests
        'chore' // maintenance tasks
      ]
    ],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100],
    'body-max-length': [2, 'always', 1000],
    'footer-empty': [2, 'never'],
    'footer-max-length': [2, 'always', 1000],
    'type-case': [2, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never', '.'],
    'references-empty': [2, 'never'],

    // Custom rule for task number format (e.g., #1234)
    'subject-task-number': [
      2,
      'always',
      /\s#\d+/ // Matches a space followed by a # and digits (task number format)
      /* /#\d+$/ // Matches a task number at the end of the message (e.g., #1234) */
    ]
  }
};
