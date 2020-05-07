<!--[![Stars][stars-shield]][repository-url] [![Forks][forks-shield]][repository-url] [![Downloads][downloads-shield]][downloads-url] [![Issues][issues-shield]][issues-url]
-->
<div>
	<img align="right" width="150" src="https://qbranch-sydney.s3-ap-southeast-2.amazonaws.com/qbranch_logo.gif">
</div>

# <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FZGsLUAX">Dynamic World Clock</a>

#### _Configurable record driven World Clock_

#### This clock component can be shown on any record or app page, or even place it in the utility bar. It can detect location from standard and custom fields or use the system time along with a list of additional locations if desired.

<h4 align="center">
	<a href="#features">Features</a> |
	<a href="#getting-started">Getting Started</a> |
	<a href="#usage">Usage</a> |
	<a href="#faqs">FAQs</a> |
	<a href="#documentation">Documentation</a> |
    	<a href="#tests">Tests</a> |
	<a href="#contributing">Contributing</a> |
	<a href="#acknowledgements">Acknowledgements</a> 🥰
</h4>

<p align="center">
	<img src="images/Screenshot2.png">
</p>

---

## [Features]

Use this highly customisable component to give you a dynamic display of world time from any location in your organisation.

This clock component can be shown on any record or app page, or even place it in the utility bar. It can detect location from standard and custom fields or use the system time along with a list of additional locations if desired.

The component also allows for additional cities to be added through the design attributes to give the user ultimate flexibility.

- **Available on App/Record/Utility.** This component can be used on App Pages, Record Pages and even in the Utility Bar.
- **Field flexibility.** .Use any standard or custom field on the record to get the local time, for example Billing City or Shipping City.
- **Additional times.** Add additional locations in the design attributes of the component.

## [Getting Started]

### [Prerequisites][wiki-prerequisites-url]

There are a few items you need to setup before installing:

1. You will need to [Enable Lightning Experience](https://trailhead.salesforce.com/en/content/learn/modules/lex_migration_introduction/lex_migration_introduction_administration).
2. You will need to [Enable My Domain](https://trailhead.salesforce.com/en/content/learn/modules/identity_login/identity_login_my_domain).

### [Install][wiki-install-url]

Deploy the actions:

<a style="margin-right: 40%;" href="https://deploy-to-sfdx.com?template=https://github.com/sfdc-qbranch/DynamicWorldClock">
  <img align="right" alt="Deploy using SFDX"
       src="https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg">
</a>

1. Click one of the "Deploy Buttons".
2. Select the Org Type (Production / Sandbox).
3. Login to your Org.
4. Deploy the code.
5. [Assign](https://help.salesforce.com/articleView?id=perm_sets_assigning.htm&type=5) the qsyd_Invocable_Email_Actions Permission Set to any users that will trigger email sends.

## [Usage][wiki-usage-url]

There are 2 actions included:

- QSyd - Invocable Email Action
- QSyd - Invocable Email Template Action

The latter is intentionally opinionated for exclusive use with a Lightning Email Template. The premise behind these actions is to expose the full capability of Salesforce emails, and as such the api is deliberately comprehensive.

To declaratively invoke these actions, do the following:

1. Load the Process Builder or Lightning Flow editor
2. Add an Action
3. Select the preferred action: **"QSyd - Invocable Email Action"** or **"QSyd - Invocable Email Template Action"**
4. Populate the required fields
5. Populate other logically required fields, eg. At least 1 Recipient field (To, Cc, Bcc or Target Object Id)
6. Optionally associate the email with a related record via the "What Id"

⚠️ Exceptions due to incorrect configuration or technical send errors will be sent as the standard [email](https://help.salesforce.com/articleView?id=flow_troubleshoot_error_email.htm&type=5) or can be displayed as a [handled fault](https://help.salesforce.com/articleView?id=flow_build_logic_fault.htm&type=5) within the Lightning Flow Builder.

#### Example exception

> An Apex error occurred: qsyd_InvocableEmailBase.InvocableEmailException: >>> qsyd_InvocableEmailAction.sendEmail failed with exception: >>> Exception executing qsyd_InvocableEmailBase.send: **Recipient not provided. Please provide at least one of the following: toAddress, ccAddress, bccAddress, targetObjectId**

### [QSyd - Invocable Email Action][github-qsyd_invocableemailaction-url]

#### A simple use case for Process Builder:

<div>
	<img align="center" src="https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/images/qsyd_InvocableEmailAction_ProcessBuilder_parameters.png">
</div>

#### A simple use case for Lightning Flow:

<div>
	<img align="center" src="https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/images/qsyd_InvocableEmailAction_Flow_parameters_1.png">
</div>
<div>
	<img align="center" src="https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/images/qsyd_InvocableEmailAction_Flow_parameters_2.png">
</div>

#### A programmatic example:

```apex
private static void given_requiredEmailParametersAreProvided_when_anEmailIsInstantiated_then_anEmailIsSent() {
        qsyd_InvocableEmailAction.InvocableEmailParam param = new qsyd_InvocableEmailAction.InvocableEmailParam();
        List<qsyd_InvocableEmailAction.InvocableEmailParam> params = new List<qsyd_InvocableEmailAction.InvocableEmailParam>();

        initialiseSetupTestData();

        Test.startTest();

        param.toAddress = 'plucas@salesforce.com';
        param.ccAddress = 'test_email@gmail.com';
        param.bccAddress = 'test_email@gmail.com';
        param.throwExceptionForSendErrors = true;
        param.subject = 'Email Subject';
        param.bodyPlainText = 'Plain text body';
        param.bodyHtml = '<html><body><strong>Rich text body</strong></body></html>';
        param.charSet = 'utf-8';
        param.attachmentIds = CONTENTVERSION_EXAMPLES;
        param.whatId = CASE_EXAMPLE;
        param.parentMessageIds = INREPLYTO_EXAMPLE;
        param.orgWideEmailAddress = '';
        param.emailOptOutPolicy = 'FILTER';
        param.saveAsActivity = true;
        params.add(param);

        List<qsyd_InvocableEmailResult> results = qsyd_InvocableEmailAction.sendEmail(params);
        Integer invocations = Limits.getEmailInvocations();

        // Email was sent
        System.assertEquals(1, invocations);

        Test.stopTest();
    }
```

\* Refer to the [test class](https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/f595d2818fbd2201e6b7e3341cf03fc4054e9bbb/src/classes/qsyd_InvocableEmailActionTest.cls#L43) for complete working examples.

### [QSyd - Invocable Email Template Action][github-qsyd_invocableemailtemplateaction-url]

#### Example lightning email template:

<div>
	<img align="center" src="https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/images/lightning_email_template.png">
</div>

#### A simple use case for Process Builder:

<div>
	<img align="center" src="https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/images/qsyd_InvocableEmailTemplateAction_ProcessBuilder_parameters.png">
</div>

#### A simple use case for Lightning Flow:

<div>
	<img align="center" src="https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/images/qsyd_InvocableEmailTemplateAction_Flow_parameters.png">
</div>

#### A programmatic example:

```
   @IsTest
    private static void given_requiredEmailParametersAreProvided_when_anEmailIsInstantiated_then_anEmailIsSent() {
        qsyd_InvocableEmailTemplateAction.InvocableEmailParam param = new qsyd_InvocableEmailTemplateAction.InvocableEmailParam();
        List<qsyd_InvocableEmailTemplateAction.InvocableEmailParam> params = new List<qsyd_InvocableEmailTemplateAction.InvocableEmailParam>();

        initialiseSetupTestData();

        Test.startTest();

        param.toAddress = 'plucas@salesforce.com';
        param.emailTemplate = 'Test Template';
        param.targetObjectId = CONTACT_EXAMPLE;
        params.add(param);

        List<qsyd_InvocableEmailResult> results = qsyd_InvocableEmailTemplateAction.sendEmail(params);
        Integer invocations = Limits.getEmailInvocations();

        // Assert an email was sent
        System.assertEquals(1, invocations);

        Test.stopTest();
    }
```

\* Refer to the [test class](https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/2825b3e4245158ec0b14754485b37362ba9234a5/src/classes/qsyd_InvocableEmailTemplateActionTest.cls#L46) for complete working examples.

### Supported options

| Option                                        | Description                                                                                                                                                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Recipient To Addresses`                      | Recipient To Addresses, Max 100, Comma Delimited                                                                                                                                                                          |
| `Recipient Cc Addresses`                      | Recipient Cc Addresses, Max 25, Comma Delimited                                                                                                                                                                           |
| `Recipient Bcc Addresses`                     | Recipient Bcc Addresses, Max 25, Comma Delimited                                                                                                                                                                          |
| `Email Template Id or Name`                   | Id, Name, or Developer Name of Email Template                                                                                                                                                                             |
| `Email Subject`                               | Email Subject                                                                                                                                                                                                             |
| `Email Plain Text Body`                       | Email Plain Text Body                                                                                                                                                                                                     |
| `Email Html Body`                             | Email Html Body                                                                                                                                                                                                           |
| `Email Character Set`                         | The character set for the email. If this value is null, the user's default value is used                                                                                                                                  |
| `Attachment Ids`                              | Comma delimited list of Document, ContentVersion, or Attachment Ids                                                                                                                                                       |
| `Target Object Id - Contact, Lead or User Id` | The Id of the contact, lead, or user to whom the email will be sent                                                                                                                                                       |
| `What Id`                                     | If you specify a contact for the targetObjectId field, you can specify an optional whatId as well. Must be either a Account, Asset, Campaign, Case, Contract, Opportunity, Order, Product, Solution, Custom               |
| `Parent Message Id`                           | This field identifies the email or emails to which this email is a reply (parent emails)                                                                                                                                  |
| `Email Opt Out Policy`                        | If you added recipients by ID instead of email address and the Email Opt Out option is set, this method determines the behavior of the sendEmail() call                                                                   |
| `Org Wide Email Address`                      | The associated org wide email address set up in Organization-Wide Addresses                                                                                                                                               |
| `Save as Activity?`                           | This argument only applies if the recipient list is based on targetObjectId or targetObjectIds. If HTML email tracking is enabled for the organization, you will be able to track open rate                               |
| `Use Signature?`                              | Indicates whether the email includes an email signature if the user has one configured                                                                                                                                    |
| `Treat Bodies as Template?`                   | The subject, plain text, and HTML text bodies of the email are treated as template data. The merge fields are resolved using the renderEmailTemplate method                                                               |
| `Treat Target Object as Recipient?`           | If set to true, the targetObjectId (a contact, lead, or user) is the recipient of the email. If set to false, the targetObjectId is supplied as the WhoId field for template rendering but isn’t a recipient of the email |
| `Throw an Exception for Send Errors?`         | Throw an exception containing any send results errors. The default is true                                                                                                                                                |

## [Documentation][wiki-url]

Read the [wiki][wiki-url] for documentation on AppExchange Template.

Read the [FAQs][wiki-faqs-url] answer common questions.

## [Tests][tests-url]

Included tests for the package can be viewed in the [tests][tests-url] section, it is recommended to run the tests upon deployment as the tests would normally run during a package install.

All tests should be run and pass when a change is made to the package and prior to submitting for a security review.

## [FAQs][wiki-faqs-url]

#### Does it work in Communities?

> Yes

#### Does it work in Mobile?

> Yes

#### Does it work with Person Accounts?

> Yes

#### Does it support Internationalisation (i18n)?

> Yes, labels can be translated using [Salesforce Translation Workbench](https://help.salesforce.com/articleView?id=workbench_overview.htm&type=5)

#### Others?

## [Contributing](/CONTRIBUTING.md)

See the list of [Contributors][contributors-url] who participated in this project.

If you would like to join these awesome people, please refer to [contributing.md](/CONTRIBUTING.md) for guidelines.

## Acknowledgements

Special thanks to:

- Q Branch Sydney for your continued support.
- Everyone that has requested for, used and provided feedback on this project.

## License

[![License][license-shield]][license-url] Copyright © 2020 [Q Branch][author-url]

<!--- Images -->

[stars-shield]: https://img.shields.io/github/stars/sfdc-qbranch/AppExchangeTemplate?style=flat-square&color=green
[forks-shield]: https://img.shields.io/github/forks/sfdc-qbranch/AppExchangeTemplate?style=flat-square
[version-shield]: https://img.shields.io/github/tag/sfdc-qbranch/AppExchangeTemplate?label=release&color=green
[downloads-shield]: https://img.shields.io/github/downloads/sfdc-qbranch/AppExchangeTemplate/total?style=flat-square&color=violet
[issues-shield]: https://img.shields.io/github/issues-raw/sfdc-qbranch/AppExchangeTemplate?style=flat-square&color=red
[license-shield]: https://img.shields.io/badge/License-MIT-yellow.svg

<!--- Urls -->

[repository-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate
[version-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki/Release-Notes
[downloads-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/releases
[issues-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/issues
[license-url]: http://opensource.org/licenses/MIT
[author-url]: http://github.com/paull10au
[contributors-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/contributors
[tests-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/tests
[wiki-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki
[wiki-features-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki/Features
[wiki-getting-started-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki/Getting-Started
[wiki-prerequisites-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki/Prerequisites
[wiki-install-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki/Install
[wiki-usage-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki/Usage
[wiki-faqs-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/wiki/Frequently-Asked-Questions
[github-qsyd_invocableemailaction-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/src/classes/qsyd_InvocableEmailAction.cls
[github-qsyd_invocableemailtemplateaction-url]: https://github.com/sfdc-qbranch/AppExchangeTemplate/blob/master/src/classes/qsyd_InvocableEmailTemplateAction.cls
