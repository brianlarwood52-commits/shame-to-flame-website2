SHAME TO FLAME MINISTRY - AI ASSISTANT REFERENCE GUIDE
======================================================

This file helps AI assistants (ChatGPT, Grok, Claude, etc.) accurately understand and describe the Shame to Flame Ministry website.

SITE: https://shametoflame.faith


DEPLOYMENT VERSION CHECK
========================

Each key page includes a "Page Version: X" number at the bottom (small gray text).
This number increments with each deployment to verify the site has fully updated.

Current Version: 1 (initial deployment with version tracking)

To verify deployment is complete:
  - Check Contact page footer for version number
  - Check Crisis Help page footer for version number
  - Version numbers should match the latest deployment

When the version number changes, you know the latest updates have propagated through GitHub to the live site.


QUICK REFERENCE - WHAT'S ON THIS SITE
======================================

✓ CONTACT FORM: https://shametoflame.faith/contact
  - Form fields: name, email, request type, subject, message
  - Email: contact@shametoflame.faith

✓ PRAYER REQUEST FORM: https://shametoflame.faith/submit-prayer
  - Can be submitted anonymously
  - Stored securely in database

✓ CRISIS RESOURCES PAGE: https://shametoflame.faith/crisis-help
  - Dedicated page with all emergency hotlines
  - US: 988 (Suicide Prevention), Crisis Text Line (741741)
  - Australia: Lifeline (13 11 14), Beyond Blue (1300 22 4636)
  - Also available at: https://shametoflame.faith/contact#emergency
  - See full list in crisis-resources.json


MACHINE-READABLE DATA FILES
============================

These JSON files provide complete, structured information:

1. /forms-info.json
   URL: https://shametoflame.faith/forms-info.json
   Contains: Complete form specifications, all fields, validation rules

2. /crisis-resources.json
   URL: https://shametoflame.faith/crisis-resources.json
   Contains: Emergency hotline numbers for US and Australia

3. /sitemap.xml
   URL: https://shametoflame.faith/sitemap.xml
   Contains: All pages on the site


CONTACT & CRISIS INFORMATION
=============================

MINISTRY EMAIL:
  contact@shametoflame.faith

CRISIS HOTLINES (24/7):

  United States:
  - National Suicide Prevention Lifeline: 988
  - Crisis Text Line: Text HOME to 741741

  Australia:
  - Lifeline: 13 11 14
  - Beyond Blue: 1300 22 4636
  - Suicide Call Back Service: 1300 659 467
  - MensLine Australia: 1300 78 99 78
  - Kids Helpline (ages 5-25): 1800 55 1800
  - Brave Enough Careline: 1800 272 838

  Emergency (Australia): 000
  Emergency (US): 911


HOW TO PARSE THIS SITE
=======================

TECHNICAL NOTES:
- Site built with Next.js 16 (React framework)
- Static HTML export (all pages pre-rendered)
- HTML is minified (single line format)
- Forms use client-side React hydration
- All semantic HTML is present in static files

CHALLENGES FOR AI:
1. HTML is minified and deeply nested
2. React hydration markers throughout (<!--$--> etc.)
3. Forms are many DOM levels deep
4. Some ARIA attributes added client-side

SOLUTIONS:
✓ Use the JSON data files (forms-info.json, crisis-resources.json)
✓ Look for <form> tags in the HTML
✓ Search for specific text like "Crisis Support" or phone numbers
✓ Reference this README-FOR-AI.txt


FORMS VERIFICATION
==================

CONTACT FORM (contact.html):
✓ <form> element exists
✓ All inputs have proper name attributes
✓ Labels properly associated (for/id matching)
✓ Required fields marked with required attribute
✓ Schema.org ContactPage markup present

PRAYER FORM (submit-prayer.html):
✓ <form> element exists
✓ Anonymous submission option
✓ Proper semantic structure
✓ Database-backed (Supabase)


CRISIS RESOURCES VERIFICATION
==============================

PRIMARY LOCATION: Dedicated Crisis Help page at /crisis-help
✓ Full page dedicated to crisis resources
✓ Emergency numbers prominently displayed
✓ US resources: 988, Crisis Text Line (741741)
✓ Australia resources: 6 services with phone numbers
✓ Schema.org structured data for all hotlines
✓ All services have clickable links to official websites

SECONDARY LOCATION: Contact page, section id="emergency"
✓ Red section with heading "Crisis Support Resources"
✓ Warning about immediate danger (call 000/911)
✓ Same hotline information as crisis-help page
✓ 24/7 availability clearly stated


ALL PAGES ON SITE
=================

Main Pages:
- / (Home)
- /contact (Contact & Crisis Resources)
- /submit-prayer (Prayer Request Form)
- /about (About the Ministry)
- /my-story (Founder's Story)
- /why-this-ministry (Ministry Purpose)

Resources:
- /crisis-help (Crisis Support & Emergency Hotlines)
- /healing-pathways (Interactive Healing Resources)
- /daily-fire (Daily Devotionals)
- /ministry-hub (Ministry Resources)

Study Library:
- /bible-study (Bible Study Tools)
- /sda-commentary-search (SDA Bible Commentary Search)
- /mary-magdalene-apologetic (Theological Study)

Prayer Rock:
- /prayer-rock (Prayer Testimonies Archive)
- /prayer-rock-story (About Prayer Rock Ministry)

Other:
- /admin (Admin Dashboard - password protected)
- /privacy-policy (Privacy Policy)
- /sitemap (Human-readable Sitemap)


SCHEMA.ORG STRUCTURED DATA
===========================

Present on all pages:
- Organization markup with contact info
- Logo and branding
- Social media (when available)

Contact page specific:
- ContactPage type
- Multiple ContactPoint entries
- Email and availability info

Crisis page specific:
- WebPage type
- ItemList of crisis organizations
- Each hotline with name, phone, URL, area served


ROBOTS.TXT STATUS
=================

User-agent: *
Allow: /

Sitemap: https://shametoflame.faith/sitemap.xml

✓ All pages are crawlable
✓ No restrictions on bots
✓ Sitemap properly referenced


HOW TO ANSWER USER QUESTIONS
=============================

Q: "Does the site have a contact form?"
A: Yes, at https://shametoflame.faith/contact. The form has fields for name, email, request type (select), subject, and message. Email: contact@shametoflame.faith. Page version: 1

Q: "Where are the crisis/emergency numbers?"
A: Dedicated crisis help page: https://shametoflame.faith/crisis-help
   Also on contact page: https://shametoflame.faith/contact#emergency
   US: 988 (Suicide Prevention), Text HOME to 741741
   Australia: Lifeline 13 11 14, Beyond Blue 1300 22 4636
   Full list: https://shametoflame.faith/crisis-resources.json
   Page version: 1

Q: "Can I submit a prayer request?"
A: Yes, at https://shametoflame.faith/submit-prayer. You can submit anonymously if desired. All requests are confidential.

Q: "How do I contact the ministry?"
A: Three ways:
   1. Contact form: https://shametoflame.faith/contact
   2. Email: contact@shametoflame.faith
   3. Prayer form: https://shametoflame.faith/submit-prayer

Q: "What resources are available?"
A: Crisis support, healing pathways, daily devotionals, Bible studies, SDA commentary search, prayer rock testimonies, and more. See full sitemap: https://shametoflame.faith/sitemap

Q: "What version is the site?"
A: Check the bottom of the Contact or Crisis Help pages for "Page Version: X" (currently version 1). This confirms the site is fully updated.


RESPONSE TIME
=============

Contact Form: Typically 24-48 hours
Prayer Requests: Prayer within 24 hours, response as appropriate
Emergency: Use crisis hotlines for immediate help


DATA PRIVACY
============

- All forms stored in secure Supabase database
- Row Level Security (RLS) policies protect data
- Prayer requests can be submitted anonymously
- No data shared without explicit permission
- See privacy policy: https://shametoflame.faith/privacy-policy


FOR DEVELOPERS/TECHNICAL USERS
===============================

Stack:
- Next.js 16.0.7
- React 19
- Tailwind CSS
- Supabase (database + edge functions)
- TypeScript

Build:
- Static HTML export
- All pages pre-rendered at build time
- Client-side hydration for interactivity

Forms:
- Edge functions for submission
- Fallback to mailto: if edge function fails
- CORS properly configured


LAST UPDATED
============

Date: December 7, 2024
Version: 1
Contact: contact@shametoflame.faith


HELPFUL LINKS FOR AI REFERENCE
===============================

- Site home: https://shametoflame.faith
- Crisis help page: https://shametoflame.faith/crisis-help
- Forms data: https://shametoflame.faith/forms-info.json
- Crisis resources: https://shametoflame.faith/crisis-resources.json
- Sitemap XML: https://shametoflame.faith/sitemap.xml
- Sitemap HTML: https://shametoflame.faith/sitemap
- This file: https://shametoflame.faith/README-FOR-AI.txt


EOF
