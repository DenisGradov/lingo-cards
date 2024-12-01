import {I_KNOW_STAGE} from "../constants/reviewStages.js";

export function getWordCountByCategory(words) {
    const now = Date.now();

    const counts = {
        teach: 0,
        iKnow: 0,
        learned: 0,
    };

    words.forEach((word) => {
        if (word.next_review_time === 0 || word.next_review_time <= now) {
            counts.teach += 1;
        } else if (word.review_stage < I_KNOW_STAGE) {
            counts.iKnow += 1;
        } else {
            counts.learned += 1;
        }
    });

    return counts;
}