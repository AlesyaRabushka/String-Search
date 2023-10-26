
function levenshteinDistance(str1: string, str2: string): number {
    const m = str1.length;
    const n = str2.length;

    // Создаем матрицу размером (m+1) x (n+1)
    const dp: number[][] = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // Заполняем матрицу значениями
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1, // Удаление символа
                dp[i][j - 1] + 1, // Вставка символа
                dp[i - 1][j - 1] + 1 // Замена символа
            );
        }
        }
    }

    return dp[m][n];
}




// через расстояние левенштейна
// отдельно записывает слова, которые совпадают
const checkMatch = (searchedString:string, text:string) => {
    try {
        let splittedString: Array<any> = [];
        let splittedText = [];
        // console.log(text)
        
        
        splittedString = searchedString.split(' ');
        splittedText = text.replace(/[.,!?()\n]/g,"").split(' ')
        let matchedWords: Array<string> = [];
        let check = false;


        for (let i in splittedString){
            for (let j in splittedText){
                // const res = levenshtein(splittedString[i], splittedText[j])
                const res = levenshteinDistance(splittedString[i].toLowerCase(), splittedText[j].toLowerCase())
    
                if (res < 2){
                    matchedWords.push(splittedText[j]);
                }
            }
        }
        

        
        if (matchedWords.length != 0) {
            check = true;
            return {
                check, 
                matchedWords
            }
        }

        
        return {
            check: false,
            matchedWords
        }

    } catch (error) {
        console.log(error);

        throw error;
    }
}

export default checkMatch;