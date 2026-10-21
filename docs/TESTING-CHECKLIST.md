# Demo acceptance testing

This file is a checklist for running **after** `npm install` and SMTP configuration. These steps have not been claimed as executed in this isolated environment.

- [ ] `npm run build` succeeds on Node.js 22
- [ ] `npm run typecheck` succeeds
- [ ] `npm run lint` succeeds
- [ ] Home loads at desktop, tablet and 390px mobile width
- [ ] Menus and footer links navigate correctly
- [ ] All catalogue pages, filters and pagination operate
- [ ] SKU search `PLT01` finds the correct charger plate
- [ ] Product size selectors work (e.g. `TWHT05`)
- [ ] Cart persists after browser refresh
- [ ] Separate variants can be added and updated independently
- [ ] Invalid contact form and quotation form fields are rejected
- [ ] SMTP credentials missing: submit shows a server error and does not clear the cart
- [ ] SMTP credentials configured: notification arrives at kamkanamlage394@gmail.com
- [ ] Verify sent email contains correct full SKU, variants and quantities
- [ ] Customer acknowledgement email arrives if supported by SMTP provider
- [ ] Success clears cart and shows a unique reference number
- [ ] Owner can reply to the customer using the email reply-to address
- [ ] Contact form receives correct SMTP notification
- [ ] No payment checkout, stock reservation or automatic confirmed booking
- [ ] Client approves branding, product images, content and legal policies
- [ ] Actual Figma file checked once link and access are supplied
