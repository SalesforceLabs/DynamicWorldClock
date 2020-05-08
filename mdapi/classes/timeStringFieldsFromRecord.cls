public with sharing class timeStringFieldsFromRecord extends VisualEditor.DynamicPickList{
    VisualEditor.DesignTimePageContext context;
    public timeStringFieldsFromRecord(VisualEditor.DesignTimePageContext context) {
        this.context = context;
    }
    public override VisualEditor.DataRow getDefaultValue(){
        String currentPageObjectName = context.entityName;
        Map<String, Schema.SObjectField> currPageObjectfieldsMap = Schema.getGlobalDescribe().get(currentPageObjectName).getDescribe().fields.getMap();       
        for(Schema.SObjectField field : currPageObjectfieldsMap.values())
        {
            Schema.DescribeFieldResult descField = field.getDescribe();
            if(String.valueOf(descField.getType()) == 'String' || String.valueOf(descField.getType()) == 'Picklist' || String.valueOf(descField.getType()) == 'address')
            {
                VisualEditor.DataRow dataRow = new VisualEditor.DataRow(descField.getLabel(), currentPageObjectName+'.'+descField.getName());
                return dataRow;
            }
        }
        return null;
    }
    public override VisualEditor.DynamicPickListRows getValues() {
        String currentPageObjectName = context.entityName;
        VisualEditor.DynamicPickListRows picklistValues = new VisualEditor.DynamicPickListRows();
        Map<String, Schema.SObjectField> currPageObjectfieldsMap = Schema.getGlobalDescribe().get(currentPageObjectName).getDescribe().fields.getMap();       
        for(Schema.SObjectField field : currPageObjectfieldsMap.values())
        {
            Schema.DescribeFieldResult descField = field.getDescribe();
            if(String.valueOf(descField.getType()) =='String' || String.valueOf(descField.getType()) == 'Picklist' || String.valueOf(descField.getType()) =='address')
            {
                VisualEditor.DataRow dataRow = new VisualEditor.DataRow(descField.getLabel(), currentPageObjectName+'.'+descField.getName());
                picklistValues.addRow(dataRow);
            }
        }
        return picklistValues;
    }
}