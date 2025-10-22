// Feature flags configuration for CareHub
const featureFlags = {
  pastDueTasks: false  // Disabled by default
};

// Function to get a feature flag value
function getFeatureFlag(flagName) {
  return featureFlags[flagName] || false;
}

// Function to set a feature flag value (for testing purposes)
function setFeatureFlag(flagName, value) {
  featureFlags[flagName] = value;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getFeatureFlag, setFeatureFlag, featureFlags };
}
