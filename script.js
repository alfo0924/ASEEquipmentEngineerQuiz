document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const scoreDisplay = document.getElementById('score-display');
    const finalScore = document.getElementById('final-score');
    const analysisDiv = document.getElementById('analysis');

    // 正確答案
    const correctAnswers = {
        q1: 'b',
        q2: 'b',
        q3: 'c',
        q4: 'b',
        q5: 'c',
        q6: 'b',
        q7: 'c',
        q8: 'b',
        q9: 'b',
        q10: 'b'
    };

    // 答案解釋
    const explanations = {
        q1: {
            correct: '正確！設備工程師負責機台的維修、維護、保養和故障排除。',
            incorrect: '錯誤。設備工程師的主要職責是機台的維修、維護、保養和故障排除。'
        },
        q2: {
            correct: '正確！日月光設備工程師通常採用日夜輪班制，約2-3個月輪一次。',
            incorrect: '錯誤。日月光設備工程師通常採用日夜輪班制，約2-3個月輪一次。'
        },
        q3: {
            correct: '正確！凸輪不屬於連接件，而是運動機構元件。',
            incorrect: '錯誤。凸輪不屬於連接件，而是運動機構元件。螺栓、銷和鍵都是常見的連接件。'
        },
        q4: {
            correct: '正確！設備工程師需要具備機械、電子、自動化等綜合知識。',
            incorrect: '錯誤。設備工程師需要具備機械、電子、自動化等綜合知識，而不是單一領域的知識。'
        },
        q5: {
            correct: '正確！投資理財計劃不是日月光面試中常見的問題。',
            incorrect: '錯誤。投資理財計劃不是日月光面試中常見的問題，其他選項都是常見的面試問題。'
        },
        q6: {
            correct: '正確！日月光面試流程通常包含筆試、主管面試和人資面試。',
            incorrect: '錯誤。日月光面試流程通常包含筆試、主管面試和人資面試。'
        },
        q7: {
            correct: '正確！鍛造機屬於塑性成型加工設備，不是切削加工設備。',
            incorrect: '錯誤。鍛造機屬於塑性成型加工設備，而車床、銑床和磨床都是切削加工設備。'
        },
        q8: {
            correct: '正確！日月光提供新進設備工程師完整的職前訓練，包括理論和實務操作。',
            incorrect: '錯誤。日月光提供新進設備工程師完整的職前訓練，包括理論和實務操作，因為產線24小時運作，需要確保工程師能正確處理問題。'
        },
        q9: {
            correct: '正確！機動學主要研究機械的路徑、速度、加速度等運動特性。',
            incorrect: '錯誤。機動學主要研究機械的路徑、速度、加速度等運動特性。'
        },
        q10: {
            correct: '正確！機械工程概論包括機械元件、機構原理、力學分析等知識。',
            incorrect: '錯誤。機械工程概論包括機械元件、機構原理、力學分析等知識。'
        }
    };

    // 題目分類
    const categories = {
        '機械知識': ['q3', 'q7', 'q9', 'q10'],
        '工作職責': ['q1', 'q4', 'q8'],
        '面試與工作環境': ['q2', 'q5', 'q6']
    };

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let score = 0;
        const userAnswers = {};
        const categoryScores = {
            '機械知識': { correct: 0, total: categories['機械知識'].length },
            '工作職責': { correct: 0, total: categories['工作職責'].length },
            '面試與工作環境': { correct: 0, total: categories['面試與工作環境'].length }
        };

        // 檢查答案並顯示反饋
        for (let i = 1; i <= 10; i++) {
            const questionName = `q${i}`;
            const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
            const feedbackDiv = document.getElementById(`feedback-${questionName}`);

            if (userAnswer) {
                userAnswers[questionName] = userAnswer.value;

                if (userAnswer.value === correctAnswers[questionName]) {
                    score++;
                    feedbackDiv.textContent = explanations[questionName].correct;
                    feedbackDiv.className = 'feedback correct';

                    // 更新分類得分
                    for (const category in categories) {
                        if (categories[category].includes(questionName)) {
                            categoryScores[category].correct++;
                            break;
                        }
                    }
                } else {
                    feedbackDiv.textContent = explanations[questionName].incorrect +
                        ` 正確答案是選項 ${correctAnswers[questionName].toUpperCase()}.`;
                    feedbackDiv.className = 'feedback incorrect';
                }
            } else {
                feedbackDiv.textContent = '您未回答此題。正確答案是選項 ' +
                    correctAnswers[questionName].toUpperCase() + '.';
                feedbackDiv.className = 'feedback incorrect';
            }
        }

        // 顯示總分
        finalScore.textContent = score;
        scoreDisplay.classList.remove('hidden');

        // 滾動到頂部
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 分析結果
        let analysisHTML = '<h3>知識領域分析</h3>';

        for (const category in categoryScores) {
            const correct = categoryScores[category].correct;
            const total = categoryScores[category].total;
            const percentage = (correct / total) * 100;

            let categoryClass = '';
            let recommendation = '';

            if (percentage < 50) {
                categoryClass = 'weak';
                recommendation = `建議加強${category}的學習。`;
            } else if (percentage < 75) {
                categoryClass = 'moderate';
                recommendation = `${category}掌握尚可，但仍有提升空間。`;
            } else {
                categoryClass = 'strong';
                recommendation = `${category}掌握良好，繼續保持！`;
            }

            analysisHTML += `<div class="category ${categoryClass}">
                <strong>${category}:</strong> ${correct}/${total} (${percentage.toFixed(0)}%)
                <p>${recommendation}</p>
            </div>`;
        }

        analysisDiv.innerHTML = analysisHTML;

        // 禁用提交按鈕
        submitBtn.disabled = true;
    });
});
