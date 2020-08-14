public with sharing class apiKeyFromCustomMetadata {
    @AuraEnabled
    public static string getAPIKey(){
        return [SELECT Google_API_Key__c FROM Dynamic_World_Clock_Setting__mdt WHERE Label = 'Default Setting' LIMIT 1].Google_API_Key__c;
    }
}