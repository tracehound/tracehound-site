# TRACEHOUND

**Deterministic runtime security buffer for high-velocity APIs.**

Tracehound Core is a deterministic and fail-open runtime security layer designed to operate between detection systems and operational response.
It provides bounded ingestion, rate and buffer controls, controlled choke mechanisms, and reproducible event processing.
The system does not classify threats or enforce policies. Instead, it guarantees controlled runtime behavior and integrity of the resulting event chain.

## Contact Form Delivery

The site-local contact form submits to `POST /api/contact`.

Behavior:

- Delivery uses the Resend Node.js SDK from the route handler.
- Configure `RESEND_API_KEY`, `TRACEHOUND_CONTACT_TO`, and `TRACEHOUND_CONTACT_FROM`.
- The contact route sends both `text` and `html` versions of the message.
- `replyTo` is set to the submitting user's email address.

Environment variables:

```bash
RESEND_API_KEY=re_xxxxxxxxx
TRACEHOUND_CONTACT_TO=security@your-domain.tld
TRACEHOUND_CONTACT_FROM=Tracehound Site <contact@your-domain.tld>
```
