
export const buildUrl = (path: string = ""): string => {
    // Read values from environment variables
    const scheme = process.env.NEXT_PUBLIC_URL_SCHEME;
    const ipAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
    const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  
    // Validate required environment variables
    if (!scheme || !ipAddress || !port) {
      throw new Error(
        "Missing one or more required environment variables: NEXT_PUBLIC_URL_SCHEME, NEXT_PUBLIC_IP_ADDRESS, NEXT_PUBLIC_APP_API_PORT"
      );
    }
  
    // Build the base URL
    const baseUrl = `${scheme}://${ipAddress}:${port}`;
  
    // Combine base URL with the provided path
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  };