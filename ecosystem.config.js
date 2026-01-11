module.exports = {
  apps: [
    {
      name: 'ra',
      cwd: 'C:/Users/product_user/.www/frontend',

      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 8090',

      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,

      env_production: {
        NODE_ENV: 'production',
        PORT: 8090,

        NEXT_PUBLIC_APP_API_PORT: 9080,
        NEXT_PUBLIC_IP_ADDRESS: '127.0.0.1',
        NEXT_PUBLIC_URL_SCHEME: 'http',

        NEXT_PUBLIC_USERS: '/api/v1/users',
        NEXT_PUBLIC_PROFILE: '/api/v1/auth/profile',
        NEXT_PUBLIC_AUTHENTICATE: '/api/v1/auth/login',
        NEXT_PUBLIC_LOGOUT: '/api/v1/auth/logout',
        NEXT_PUBLIC_REGISTER: '/api/v1/auth/register',
        NEXT_PUBLIC_APP_REPORTING_ENDPOINT: '/api/v1/connections',
        NEXT_PUBLIC_APP_TEST_CONNECTION_ENDPOINT: '/test-connection',
        NEXT_PUBLIC_REPORT_TYPES: '/api/v1/report-types',
        NEXT_PUBLIC_REPORTS: '/api/v1/reports',
        NEXT_PUBLIC_TEST_QUERY: '/api/v1/reports/test-query',
        NEXT_PUBLIC_AI_GENERATE_QUERY: '/api/v1/reports/ai-generate-query',
        NEXT_PUBLIC_EXECUTE_QUERY: '/api/v1/reports/save-query',
        NEXT_PUBLIC_REPORT_PARAMETERS: '/api/v1/reports/report-parameters',
        NEXT_PUBLIC_GENERATE_REPORT: '/api/v1/tasks',
        NEXT_PUBLIC_SCHEDULED_REPORT: '/api/v1/tasks/completed-tasks',
        NEXT_PUBLIC_PENDING_REPORT: '/api/v1/tasks/pending-tasks',
        NEXT_PUBLIC_DOWNLOAD_REPORT: '/api/v1/tasks/download-report',
        NEXT_PUBLIC_ROLES: '/api/v1/roles',
        NEXT_PUBLIC_PERMISSIONS: '/api/v1/permissions',
        NEXT_PUBLIC_ASSIGN_USER_ROLE: '/api/v1/users/assign-role'
      }
    }
  ]
}
