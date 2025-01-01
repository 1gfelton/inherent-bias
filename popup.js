// Event listener for the popup button click
document.getElementById('popupButton').addEventListener('click', () => {
    console.log('Button pressed, executing script...');

    // Query the active tab
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        console.log('Injecting script into tab', tabs[0].id);  // Log tab ID for debugging
        
        // Inject the entire script (including all the helper functions and execution)
        browser.tabs.executeScript(tabs[0].id, {
            code: `
                // Backend URL (Ensure this is set to your actual backend URL)
                const backendUrl = 'http://localhost:5000'; // Change this to your actual backend URL

                // Predefined set of biased words
                const biasTerms = [
                    "good", "bad", "great", "horrible", "amazing", "terrible", "wonderful", "awful", "fantastic", "disastrous",
                    "superb", "dreadful", "excellent", "atrocious", "remarkable", "hideous", "positive", "negative", "impressive", "abysmal",
                    "best", "worst", "fabulous", "monstrous", "outstanding", "horrific", "incredible", "unacceptable", "mediocre", "shocking",
                    "unbelievable", "pathetic", "splendid", "unimpressive", "out of this world", "disappointing", "surprising", "grotesque", "greatest", "laughable",
                    "untrustworthy", "unreliable", "stunning", "disastrous", "incompetent", "heartbreaking", "disturbing", "disgusting", "abominable", "obnoxious",
                    "terrifying", "delightful", "repulsive", "marvelous", "lousy", "amusing", "shocking", "deplorable", "tragic", "outstanding",
                    "satisfying", "unsatisfactory", "horrifying", "foolish", "unforgivable", "evil", "unfair", "brilliant", "wrong",
                    "indifferent", "miserable", "beautiful", "awful", "displeasing", "ruthless", "nasty", "contemptible", "hopeless", "ugly",
                    "unjust", "unbelievable", "corrupt", "dirty", "absurd", "amoral", "unfortunate", "gross", "unreasonable", "horrifying", 
                    "terrifying", "sickening", "atrocious", "unspeakable", "believable", "hilarious", "unsurprising", "terrible", "unforgivable", 
                    "chaotic", "unnecessary", "expected", "disrespectful", "pointless", "prejudiced", "unprofessional", "disengaging", "compelling", 
                    "uninteresting", "distasteful", "favorable", "unpleasant", "disastrous", "gripping", "mind-numbing", "unwanted", "flawed",
                    "awesome", "misleading", "decent", "unremarkable", "underwhelming", "obvious", "unexciting", "outdated", "hopeless", "absurd",
                    "mournful", "disturbing", "thoughtful", "appalling", "intolerable", "shocking", "questionable", "unconscious", "clumsy", "insensitive",
                    "unfriendly", "outrageous", "sensational", "decent", "horrendous", "distorted", "unfavorable", "exaggerated", "arrogant", "gritty",
                    "heartless", "silly", "dishonest", "heartwarming", "violent", "disorienting", "provoking", "distrustful", "badly", "compassionate",
                    "horrible", "untimely", "thoughtless", "lazy", "incompetent", "unrealistic", "conscientious", "meaningless", "exhausting", "horrendous",
                    "sad", "mournful", "intolerable", "disastrous", "ridiculous", "sincere", "heartwarming", "draining", "imperfect", "drastic",
                    "insensitive", "irresponsible", "irritating", "terrible", "entertaining", "unworthy", "too much", "disappointing", "mournful",
                    "corrupt", "fatal", "unnecessary", "bold", "stupid", "innocent", "alarming", "ungrateful", "boring", "horrific",
                    "annoying", "irregular", "overwhelming", "wretched", "sadistic", "horrible", "unsustainable", "inconsistent", "flawed", "sad",
                    "pretentious", "questionable", "unbelievable", "negative", "irritating", "disappointing", "low", "demoralizing", "disheartening",
                    "horrific", "pathetic", "distasteful", "soothing", "broken", "devastating", "ridiculous", "wonderful", "shocking", "predictable",
                    "lacking", "overrated", "dumb", "empty", "predictable", "bitter", "unfair", "untrustworthy", "unnecessary", "unimpressive",
                    "mediocre", "hypocritical", "offensive", "pointless", "sadistic", "flawed", "genuine", "fake", "vulgar", "unprofessional",
                    "irrational", "horrendous", "shameless", "pessimistic", "disturbing", "ludicrous", "foolish", "dangerous", "unjustifiable", "unreliable",
                    "irrational", "unfortunate", "bold", "repulsive", "untimely", "unmotivated", "inconsistent", "fatal", "unwanted", "irrational",
                    "weak", "atrocious", "unbelievable", "horrible", "pathetic", "unsupportive", "disrespectful", "unnecessary", "untrustworthy",
                    "imperfect", "hopeless", "monstrous", "bad", "ineffective", "horrific", "terrible", "unintelligent", "untruthful", "embarrassing",
                    "outdated", "hopeless", "rude", "outrageous", "unusual", "sadistic", "hopeless", "unremarkable", "displeasing", "unimpressive",
                    "unhappy", "dangerous", "debilitating", "ridiculous", "meaningless", "noteworthy", "fake", "toxic", "offensive", "unpredictable",
                    "degrading", "toxic", "shallow", "insensitive", "ludicrous", "sad", "inconsiderate", "gross", "mind-numbing", "unfeasible", "shameful",
                    "disturbed", "unforgiving", "negative", "useless", "grotesque", "unfit", "undecided", "irrational", "mournful", "horrific",
                    "unsuitable", "undesirable", "mediocre", "tragic", "unmotivated", "irresponsible", "horrendous", "unrelenting", "paranoid", "useless",
                    "unhelpful", "distracting", "outrageous", "mean", "terrible", "meaningless", "problematic", "undeserved", "unacceptable", "nasty",
                    "bland", "irrelevant", "prejudiced", "ineffective", "shocking", "ridiculous", "horrendous", "unqualified", "dangerous", "disjointed",
                    "ridiculous", "misleading", "outdated", "unrealistic", "selfish", "disastrous", "wrong", "pitiful", "unconscious", "unproductive",
                    // New set of words implying subjectivity, opinions, necessity, or underlying motives
                    "should", "must", "imperative", "necessary", "required", "demand", "urge", "compelled", "ought", "need", 
                    "recommend", "insist", "prefer", "desire", "want", "require", "suggest", "command", "obligate", "force",
                    "urgent", "critical", "compulsory", "preferable", "unavoidable", "suggested", "desired", "mandatory", "pressing", "vital", 
                    "essential", "exhort", "recommendation", "obligation", "advise", "expect", "demanding", "instruct", "needful", "advised",
                    "necessary", "compelling", "required", "ought to", "advisable", "inevitable", "demanding", "mandate", "suggestive", "compelled",
                    "expected", "should have", "imperiously", "needed", "forceful", "unquestionable", "obliged", "desired", "unavoidable", "preferably", 
                    "necessary", "assured", "urgent", "incontestable", "assumed", "demanded", "pressured", "compulsory", "to be", "wanting",
                    "best to", "should be", "definite", "applicable", "necessary", "expected", "encouraged", "probable", "prerequisite", "inevitable", 
                    "reminded", "essentially", "convinced", "preferably", "expected to", "must be", "vital", "pressured", "mandatory", "recommendable",
                    "undeniable", "demanded", "to need", "coercion", "best suited", "pointed out", "deemed necessary", "essential", "critical", "suggested",
                    "instructed", "needed", "told", "preference", "advocate", "preference", "determinant", "must do", "strongly", "assertive", "undisputed"
                    ];

                // Dictionary to store the embeddings of the bias terms
                const biasEmbeddings = {};

                // Dictionary to track words we've already processed for embeddings (to avoid duplicates)
                const seenWords = {};

                // Helper function to get color intensity based on cosine similarity
                function getColorForWord(similarityScore) {
                    const intensity = Math.floor(similarityScore * 255); // Scale similarity to 0-255 range
                    console.log('color', \`rgb(\${intensity}, 0, 0)\`)
                    return \`rgb(\${intensity}, 0, 0)\`;  // Use red channel intensity based on similarity
                }

                // Function to fetch word embedding from the backend API
                async function getWordEmbedding(word) {
                    if (seenWords[word]) {
                        // Skip this word if we've already checked it and found no embedding
                        // console.log('Skipping word (no embedding previously):', word);
                        return null;
                    }

                    try {
                        const response = await fetch(\`\${backendUrl}/get_word_embedding?word=\${word}\`);
                        const data = await response.json();

                        // If no embedding is found, mark the word as "seen"
                        if (!data.embedding) {
                            seenWords[word] = true;  // Mark this word as "seen"
                            // console.warn(\`No embedding found for word: \${word}\`);
                            return null;  // Return null if embedding not found
                        }

                        // console.log(\`Embedding for \${word}:\`, data.embedding); 
                        return data.embedding;
                    } catch (error) {
                        console.error('Error fetching word embedding:', error);
                        seenWords[word] = true;  // Mark this word as "seen" even in case of an error
                        return null;  // Return null if there's an error with the API request
                    }
                }

                // Function to calculate cosine similarity between two vectors
                function cosineSimilarity(vec1, vec2) {
                    const dotProduct = vec1.reduce((acc, val, idx) => acc + (val * vec2[idx]), 0);
                    const magnitude1 = Math.sqrt(vec1.reduce((acc, val) => acc + (val * val), 0));
                    const magnitude2 = Math.sqrt(vec2.reduce((acc, val) => acc + (val * val), 0));
                    return dotProduct / (magnitude1 * magnitude2);
                }

                // Function to process and color text nodes
                async function processTextNode(node) {
                    const textContent = node.textContent.trim();

                    if (textContent) {
                        console.log("Found text node:", node);

                        // Split the text into words
                        const words = textContent.split(/\\s+/);
                        const coloredText = [];

                        for (let word of words) {
                            // Check if the word is already "seen" (no embedding found previously)
                            if (seenWords[word]) {
                                coloredText.push(word);
                                continue;  // Skip processing this word
                            }

                            // Get the word's embedding
                            const wordEmbedding = await getWordEmbedding(word);

                            if (wordEmbedding) {
                                // Compare with bias terms (e.g., "racist", "sexist", etc.)
                                let maxSimilarity = 0;
                                for (let biasTerm of biasTerms) {
                                    // Check if the bias term's embedding is already in the dictionary
                                    if (!biasEmbeddings[biasTerm]) {
                                        biasEmbeddings[biasTerm] = await getWordEmbedding(biasTerm); // Fetch and store it
                                    }

                                    const biasTermEmbedding = biasEmbeddings[biasTerm];

                                    if (biasTermEmbedding) {
                                        // Calculate cosine similarity between the word and the bias term
                                        const similarity = cosineSimilarity(wordEmbedding, biasTermEmbedding);
                                        // console.log("current:", word, "bias term:", biasTerm, "similarity:", similarity)

                                        // Track the maximum similarity found
                                        maxSimilarity = Math.max(maxSimilarity, similarity);
                                    }
                                }

                                // Get the color based on similarity score (more red for higher similarity)
                                const color = getColorForWord(maxSimilarity);
                                console.log("word:", word, "bias:", maxSimilarity)


                                // Create colored span for the word
                                coloredText.push(\`<span style="color:\${color}"> \${word} </span>\`);
                            } else {
                                // If no embedding found, just return the word as it is (no coloring)
                                coloredText.push(word);
                            }
                        }

                        // Join the colored words and replace the original text node's content
                        const newNode = document.createElement('span');
                        newNode.innerHTML = coloredText.join(' ');
                        node.replaceWith(newNode);
                    }
                }

                // Function to execute the script
                async function changeTextColorOnPage() {
                    console.log("changeTextColorOnPage function started");

                    // Process all elements, checking for visible text
                    const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
                    let processedNodeCount = 0;

                    for (let element of elements) {
                        // Process text nodes inside the element (and links)
                        const textNodes = Array.from(element.childNodes).filter(child => child.nodeType === Node.TEXT_NODE);
                        for (let textNode of textNodes) {
                            await processTextNode(textNode);
                            processedNodeCount++;
                        }
                    }

                    console.log(\`Finished processing. Total modified text nodes: \${processedNodeCount}\`);
                }

                // Preload the embeddings for the bias terms when the script is loaded
                (async () => {
                    for (let biasTerm of biasTerms) {
                        if (!biasEmbeddings[biasTerm]) {
                            biasEmbeddings[biasTerm] = await getWordEmbedding(biasTerm);
                        }
                    }
                    // After preloading, execute the main function
                    changeTextColorOnPage();
                })();
            `,
        }).then(() => {
            console.log('Script executed successfully');  // Log success message
        }).catch((error) => {
            console.error('Error executing script:', error); // Log any errors
        });
    }).catch((error) => {
        console.error('Error querying tabs:', error); // Log any errors in querying tabs
    });
});
