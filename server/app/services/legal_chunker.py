import re


def split_into_sections(text):
    """
    Splits legal documents into sections.

    Features
    --------
    ✅ Removes Table of Contents
    ✅ Removes duplicate sections
    ✅ Preserves complete section text
    ✅ Extracts section number
    ✅ Extracts title
    """

    # -------------------------------------------------
    # Clean line endings
    # -------------------------------------------------

    text = text.replace("\r", "")

    # -------------------------------------------------
    # Remove everything before the real Act begins
    #
    # Your PDF starts with:
    # ARRANGEMENT OF SECTIONS
    #
    # The actual Act begins much later with:
    # CHAPTER I
    # PRELIMINARY
    # 1. Short title...
    # -------------------------------------------------

    start = re.search(
        r"CHAPTER\s+I\s+PRELIMINARY",
        text,
        re.IGNORECASE | re.DOTALL
    )

    if start:
        text = text[start.start():]

    # -------------------------------------------------
    # Find every section heading
    # Example:
    #
    # 184. Driving dangerously....
    #
    # -------------------------------------------------

    pattern = re.compile(
        r"\n(\d+[A-Z]?)\.\s",
        re.MULTILINE
    )

    matches = list(pattern.finditer(text))

    sections = []

    seen = set()

    # -------------------------------------------------
    # Split using section boundaries
    # -------------------------------------------------

    for i, match in enumerate(matches):

        start_index = match.start()

        if i + 1 < len(matches):
            end_index = matches[i + 1].start()
        else:
            end_index = len(text)

        chunk = text[start_index:end_index].strip()

        if len(chunk) < 80:
            continue

        header = re.match(
            r"(\d+[A-Z]?)\.\s*(.+)",
            chunk
        )

        if not header:
            continue

        section_number = header.group(1)

        # ---------------------------------------------
        # Skip duplicates
        # ---------------------------------------------

        if section_number in seen:
            continue

        seen.add(section_number)

        first_line = chunk.split("\n")[0].strip()

        sections.append(
            {
                "section_number": section_number,
                "title": first_line,
                "page": None,
                "act": "Motor Vehicles Act, 1988",
                "content": chunk
            }
        )

    return sections