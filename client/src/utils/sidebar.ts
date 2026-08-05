import type { Conversation } from "../types/conversation";

export function getConversationIcon(title: string): string {

    const text = title.toLowerCase();

    if (
        text.includes("drive") ||
        text.includes("vehicle") ||
        text.includes("license") ||
        text.includes("licence")
    )
        return "🚗";

    if (text.includes("consumer"))
        return "🛒";

    if (text.includes("property"))
        return "🏠";

    if (text.includes("cyber"))
        return "💻";

    if (text.includes("marriage"))
        return "💍";

    if (
        text.includes("court") ||
        text.includes("law") ||
        text.includes("judge")
    )
        return "⚖️";

    return "💬";
}

export function groupConversations(
    conversations: Conversation[]
) {

    const today: Conversation[] = [];
    const yesterday: Conversation[] = [];
    const lastWeek: Conversation[] = [];
    const older: Conversation[] = [];

    const now = new Date();

    conversations.forEach((conversation) => {

        const created = new Date(
            conversation.createdAt
        );

        const diff =
            now.getTime() -
            created.getTime();

        const days =
            Math.floor(
                diff /
                (1000 * 60 * 60 * 24)
            );

        if (days === 0)
            today.push(conversation);

        else if (days === 1)
            yesterday.push(conversation);

        else if (days < 7)
            lastWeek.push(conversation);

        else
            older.push(conversation);

    });

    return {
        today,
        yesterday,
        lastWeek,
        older,
    };

}