# Second Brain Capture

**Type:** Capture

## What it does
A quick-capture tool available from anywhere in the app. Users save ideas, links, voice notes, or images on the go. All captured content is organized, tagged, and searchable — and can be converted into study material later.

## Inputs
- Text snippet
- URL / web link
- Voice note (transcribed automatically)
- Image

## Outputs
- Item saved to Second Brain inbox
- Auto-tagged by subject if detected
- Searchable via keyword or tag
- Option to convert any item into a topic + questions via [[note-ingestion]]

## Edge cases
- Voice note too noisy to transcribe → save audio file, flag for manual review
- URL no longer accessible → save cached excerpt at time of capture
- Inbox too large → prompt to organize or convert items older than 30 days

## Related
- [[note-ingestion]] — captured items can be converted into topics and questions
