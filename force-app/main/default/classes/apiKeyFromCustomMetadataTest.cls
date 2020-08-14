@isTest
public with sharing class apiKeyFromCustomMetadataTest {
    static testMethod void testGetAPIKey() {
        String theAPIKey = apiKeyFromCustomMetadata.getAPIKey();
        System.assertNotEquals(null, theAPIKey);
    }
}
