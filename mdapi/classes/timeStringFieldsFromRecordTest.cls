@isTest
public with sharing class timeStringFieldsFromRecordTest {
    static testMethod void testRetrieveValues() {
        
        VisualEditor.DesignTimePageContext theContext = new VisualEditor.DesignTimePageContext();
        theContext.entityName = 'Account';

        timeStringFieldsFromRecord theClass = new timeStringFieldsFromRecord(theContext);
        VisualEditor.DataRow theDefault = theClass.getDefaultValue();
        VisualEditor.DynamicPickListRows theOptions = theClass.getValues();
        
        System.assertNotEquals(null, theDefault.getValue());
        System.assertNotEquals(0, theOptions.size());
    }
}