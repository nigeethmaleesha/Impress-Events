# Email setup note

The project is now prefilled for testing with the following mailbox:

- Receiving quote email: `kamkanamlage394@gmail.com`
- Temporary sender Gmail: `kamkanamlage394@gmail.com`
- Temporary `SMTP_FROM`: `kamkanamlage394@gmail.com`

## What is already done
- `.env.example` has been updated.
- `.env.local` has been added and prefilled.
- README instructions now match this setup.

## What is still required
To actually send emails, you still need to fill in:

- `SMTP_PASSWORD`

This must be the **Google App Password** generated from the same Gmail account after enabling **2-Step Verification**.

## Important
Without the App Password, the project UI will still work, but quote/contact emails will return a setup error instead of sending.
