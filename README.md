# y2c
🍠🇱2️⃣📅 Converts YAML in a public GitHub repo to Google Calendar entries

This project is a [Probot](https://probot.github.io/docs/) that monitors a `calendar.yml`
file in a repo, and converts it to an item on a Google Calendar. If possible, it should
emulate the YAML calendar format of https://github.com/openstack-infra/yaml2ical. It
will support specifying an email list that will be invited to the calendar entry, and
(by maintaining the same ID), notified by Google Calendar of any changes.

CNCF is developing this open source tool to be used by its projects and activities,
but anyone else will be welcome to use it.
