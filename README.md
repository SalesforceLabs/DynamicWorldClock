[![Stars][stars-shield]][repository-url] [![Forks][forks-shield]][repository-url] [![Downloads][downloads-shield]][downloads-url] [![Issues][issues-shield]][issues-url]

<div>
	<img align="right" width="150" src="../master/images/qbranch_logo.gif">
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

## Features

Use this highly customisable component to give you a dynamic display of world time from any location in your organisation.

This clock component can be shown on any record or app page, or even place it in the utility bar. It can detect location from standard and custom fields or use the system time along with a list of additional locations if desired.

The component also allows for additional cities to be added through the design attributes to give the user ultimate flexibility.

- **Available on App/Record/Utility -** This component can be used on App Pages, Record Pages and even in the Utility Bar.
- **Field flexibility -** Use any standard or custom field on the record to get the local time, for example Billing City or Shipping City.
- **Additional times -** Add additional locations in the design attributes of the component.

## Getting Started

### Prerequisites

There are a few items you need to setup before installing:

1. You will need to [Enable Lightning Experience](https://trailhead.salesforce.com/en/content/learn/modules/lex_migration_introduction/lex_migration_introduction_administration).
2. You will need to [Enable My Domain](https://trailhead.salesforce.com/en/content/learn/modules/identity_login/identity_login_my_domain).

--Appexchange install link with button

## Usage

There is only 1 Lightning Web Component available in the App Builder with this package:

- Dynamic World Clock

To customise the component after placing it on the page invoke these actions, do the following:

1. Load the Process Builder or Lightning Flow editor
2. Add an Action
3. Select the preferred action: **"QSyd - Invocable Email Action"** or **"QSyd - Invocable Email Template Action"**
4. Populate the required fields
5. Populate other logically required fields, eg. At least 1 Recipient field (To, Cc, Bcc or Target Object Id)
6. Optionally associate the email with a related record via the "What Id"

### Dynamic World Clock

#### A simple use case for Process Builder:

<div>
	<img align="center" src="../../images/qsyd_InvocableEmailAction_ProcessBuilder_parameters.png">
</div>

#### A simple use case for Lightning Flow:

<div>
	<img align="center" src="../../images/qsyd_InvocableEmailAction_Flow_parameters_1.png">
</div>
<div>
	<img align="center" src="../../images/qsyd_InvocableEmailAction_Flow_parameters_2.png">
</div>

#### A programmatic example:

```apex
private static void given_requiredEmailParametersAreProvided_when_anEmailIsInstantiated_then_anEmailIsSent() {
        qsyd_InvocableEmailAction.InvocableEmailParam param = new qsyd_InvocableEmailAction.InvocableEmailParam();
        List<qsyd_InvocableEmailAction.InvocableEmailParam> params = new List<qsyd_InvocableEmailAction.InvocableEmailParam>();


        List<qsyd_InvocableEmailResult> results = qsyd_InvocableEmailAction.sendEmail(params);
        Integer invocations = Limits.getEmailInvocations();

        // Email was sent
        System.assertEquals(1, invocations);

        Test.stopTest();
    }
```

### Supported config options

<div>
	<img align="center" src="../images/screenshot3.png">
</div>

## Documentation

Read the [Quip][quip-url] for external documentation on the component.

## [Tests][tests-url]

ADD JEST TESTS

## FAQs

#### Does it work in Communities?

> Yes

#### Does it work in Mobile?

> No, but this is on the roadmap

#### Does it work with Person Accounts?

> Yes

#### Does it support Internationalisation (i18n)?

> No, but this is on the roadmap

#### Others?

## [Contributing](/CONTRIBUTING.md)

See the list of [Contributors][contributors-url] who participated in this project.

If you would like to join these awesome people, please refer to [contributing.md](/CONTRIBUTING.md) for guidelines.

## Acknowledgements

Special thanks to:

- Q Branch for your continued support.
- Everyone that has requested for, used and provided feedback on this project.

## License

[![License][license-shield]][license-url] Copyright © 2020 [Q Branch][author-url]

<!--- Images -->

[stars-shield]: https://img.shields.io/github/stars/sfdc-qbranch/DynamicWorldClock?style=flat-square&color=green
[forks-shield]: https://img.shields.io/github/forks/sfdc-qbranch/DynamicWorldClock?style=flat-square
[version-shield]: https://img.shields.io/github/tag/sfdc-qbranch/DynamicWorldClock?label=release&color=green
[downloads-shield]: https://img.shields.io/github/downloads/sfdc-qbranch/DynamicWorldClock/total?style=flat-square&color=violet
[issues-shield]: https://img.shields.io/github/issues-raw/sfdc-qbranch/DynamicWorldClock?style=flat-square&color=red
[license-shield]: https://img.shields.io/badge/License-BSD%203--Clause-blue.svg

<!--- Urls -->

[repository-url]: https://github.com/sfdc-qbranch/DynamicWorldClock
[version-url]: https://github.com/sfdc-qbranch/DynamicWorldClock/wiki/Release-Notes
[downloads-url]: https://github.com/sfdc-qbranch/DynamicWorldClock/releases
[issues-url]: https://github.com/sfdc-qbranch/DynamicWorldClock/issues
[license-url]: https://opensource.org/licenses/BSD-3-Clause
[author-url]: http://github.com/shocks13
[contributors-url]: https://github.com/sfdc-qbranch/DynamicWorldClock/contributors
[tests-url]: https://github.com/sfdc-qbranch/DynamicWorldClock/tests
[quip-url]: https://salesforce.quip.com/um8sAuXNyCnO
