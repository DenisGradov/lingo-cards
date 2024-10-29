export function getWordCountByCategory(words) {
    const now = Date.now(); // Текущее время в миллисекундах

    const counts = {
        teach: 0,
        iKnow: 0,
        learned: 0,
    };

    words.forEach((word) => {
        if (word.next_review_time === 0 || word.next_review_time <= now) {
            // Сразу отображаемое слово
            counts.teach += 1;
        } else if (word.next_review_time <= now + 86400 * 1000) {
            // Покажем через 24 часа
            counts.iKnow += 1;
        } else if (word.next_review_time <= now + 604800 * 1000) {
            // Покажем через 7 дней
            counts.learned += 1;
        } else {
            // Покажем после 7 дней
            counts.learned += 1;
        }
    });

    return counts;
}
