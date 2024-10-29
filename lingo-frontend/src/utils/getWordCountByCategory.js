import {I_KNOW_STAGE} from "../constants/reviewStages.js";

export function getWordCountByCategory(words) {
    const now = Date.now(); // Текущее время в миллисекундах

    const counts = {
        teach: 0,
        iKnow: 0,
        learned: 0,
    };

    words.forEach((word) => {
        if (word.next_review_time === 0 || word.next_review_time <= now) {
            // Teach: если время показа уже наступило или next_review_time = 0
            counts.teach += 1;
        } else if (word.review_stage < I_KNOW_STAGE) {
            console.log('ss',word.review_stage)
            // I Know: если стадия меньше I_KNOW_STAGE и время показа еще не наступило
            counts.iKnow += 1;
        } else {
            // Learned: все слова со стадией I_KNOW_STAGE или выше
            counts.learned += 1;
        }
    });

    return counts;
}
