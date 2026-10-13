import re

def split_into_sections(text):
    """
    Split legal text into sections and store metadata.
    """

    pattern = r'(?=\n\d+\.\s)'

    raw_sections = re.split(pattern, text)

    sections = []

    page = 1

    for section in raw_sections:

        section = section.strip()

        if len(section) < 50:
            continue

        match = re.match(r'(\d+[A-Z]?)\.\s*(.*)', section)

        if match:
            section_number = match.group(1)

            lines = section.split("\n")

            title = lines[0]

        else:
            section_number = "Unknown"
            title = "Unknown"

        sections.append(
            {
                "section_number": section_number,
                "title": title,
                "page": page,
                "act": "Motor Vehicles Act, 1988",
                "content": section
            }
        )

        page += 1

    return sections