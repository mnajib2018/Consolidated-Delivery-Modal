/**
2 * b2b_consolidated_delivery_view.js - Outer view for consolidated delivery modal.
3 * Handles popping the modal.
4 *
5 * @author    Muhammad Najib <mnajib@wayfair.com>
6 * @copyright 2017 Wayfair LLC - All rights reserved
7 */
8define('b2b_consolidated_delivery_modal', [
9  'wayfair',
10  'react',
11  'react_dom',
12  'tracking',
13  'pl_modal',
14  'pl_button',
15  'lnrs',
16  '@styles/business_account/b2b_consolidated_delivery_modal'
17],
18  function(wf, React, ReactDom, Tracker, Modal, Button, Lnrs) {
19    'use strict';
20
21    const wfLogo = wf.appData.B2bConsolidatedDeliveryModalViewWayFairLogo;
22    const withoutContactEmail = wf.appData.B2BConsolidatedDeliveryModalViewContactWithoutEmail;
23    const bamEmail = wf.appData.B2BConsolidatedDeliveryModalBamEmail;
24    const bamName = wf.appData.B2BConsolidatedDeliveryModalBamName;
25    const bamPhone = wf.appData.B2BConsolidatedDeliveryModalBamPhone;
26
27    class B2BConsolidatedDeliveryModalView extends React.Component {
28
29      state = {
30        isOpen: true
31      };
32
33      componentDidMount() {
34        Tracker.recordEvent('B2B_ConsolDelivMessageSeen');
35      }
36
37      /**
38       * close Modal in Modal attributes using this method
39       */
40      closeModal = () => this.setState({isOpen: false});
41
42      /**
43       * The method returns a lnrs message to be displayed on the modal.
44       *
45       * @param lnrswithoutContactEmail
46       * @param bamName
47       * @param bamPhone
48       * @param bamEmail
49       * @returns {*}
50       */
51      getLnrsContact(withoutContactEmail, bamName, bamPhone, bamEmail) {
52        let message;
53        if (withoutContactEmail) {
54          message = <Lnrs key="ContactYourAccountManagerToLearnMorePeriod">Contact your Account Manager to learn more.</Lnrs>;
55        } else {
56          const emailLink = (
57            <a href={`mailto:${bamEmail}?subject=Consolidated delivery inquiry`}>{bamEmail}</a>
58            );
59          message = <Lnrs key='ContactYourAccountManagerXatXatXToLearnMorePeriod'>Contact your Account Manager {bamName} at {bamPhone} or {emailLink} to learn more.</Lnrs>;
60        }
61        return message;
62      }
63
64      render() {
65        const lnrsContact = this.getLnrsContact(withoutContactEmail, bamName, bamPhone, bamEmail);
66        return (
67          <Modal
68            size="medium"
69            isCentered
70            isOpen={this.state.isOpen}
71            onRequestClose={this.closeModal}
72          >
73            <img key={wfLogo} className="B2BConsolidatedDeliveryModal-logo" src={wfLogo} alt={wf.translate('WayfairLogo', 'Wayfair Logo')} />
74            <p className="B2BConsolidatedDeliveryModal-description">{wf.translate('ReceiveAllOfYourItemsTogetherInASingleDeliveryExclamationPoint', 'Receive all of your items together in a single delivery!')}</p>
75            <p className="B2BConsolidatedDeliveryModal-content">{lnrsContact}</p>
76            <Button
77              isB2B
78              lnrsText={wf.translate('GotItCommaThanksExclamationPoint', 'Got it, thanks!')}
79              onClick={this.closeModal}
80            />
81          </Modal>
82        );
83      }
84    }
85    const div = document.createElement('div');
86    ReactDom.render(<B2BConsolidatedDeliveryModalView />, div);
87  });
88
