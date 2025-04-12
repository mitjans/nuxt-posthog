export default defineEventHandler(async (event) => {
  const posthog = usePostHog();
  const { posthogId } = event.context;

  if (posthogId !== undefined) {
    posthog?.capture({
      distinctId: posthogId,
      event: 'test',
    });
  }
});
