const getHeaders = (sessionId: string) => ({
  "Content-Type": "application/json",
  sessionId,
});

export default getHeaders