// content.js
(function() {
    // Define the backend URL (adjust if needed)
    const backendUrl = 'http://localhost:5000';  // Change this to your backend URL if needed
  
    // Function to fetch word embedding from the backend API
    async function getWordEmbedding(word) {
      try {
        const response = await fetch(`${backendUrl}/get_word_embedding?word=${word}`);
        const data = await response.json();
  
        // Return the embedding if found
        if (data.embedding) {
            console.log(`Embedding for ${word} is ${data.embedding}`) 
          return data.embedding;
        } else {
          console.warn(`No embedding found for word: ${word}`);
          return null;  // Return null if embedding not found
        }
      } catch (error) {
        console.error('Error fetching word embedding:', error);
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
        const words = textContent.split(/\s+/);
        const biasTerms = [
            "bias", "propaganda", "fake", "unfair", "liberal", "conservative", "radical", "extreme", "biased", "partisan",
            "right", "left", "libertarian", "democrat", "republican", "liberalism", "conservatism", "disinformation",
            "manipulative", "inaccurate", "spin", "sensational", "misleading", "untruth", "false", "distorted", "polarized",
            "agenda", "partisanship", "liberal", "conservative", "bias", "fakenews", "correctness",
            "agenda", "radical", "war", "extremist", "elite", "extremist",
            "justice", "warrior", "woke", "conspiracy", "whistleblower", "deepstate", "victimhood", "identity",
            "echochamber", "cancel", "elitism", "misinformation", "censorship", "authoritarian", "populism", "propagandist",
            "socialist", "fascist", "communist", "nationalist", "unamerican", "antiamerican", "fake", "biased",
            "manipulation", "narrative", "scare", "dogma", "radicalism"
            ]
        const coloredText = [];
  
        for (let word of words) {
          // Get the word's embedding (fetch from backend)
          const wordEmbedding = await getWordEmbedding(word);
  
          if (wordEmbedding) {
            // Compare with bias terms (e.g., "racist", "sexist", etc.)
            console.log("Word:", word, "embedding:", wordEmbedding)
            let maxSimilarity = 0;
            for (let biasTerm of biasTerms) {
              const biasTermEmbedding = await getWordEmbedding(biasTerm);
  
              if (biasTermEmbedding) {
                // Calculate cosine similarity between the word and the bias term
                const similarity = cosineSimilarity(wordEmbedding, biasTermEmbedding);
  
                // Track the maximum similarity found
                maxSimilarity = Math.max(maxSimilarity, similarity);
              }
            }
  
            // Get the color based on similarity score (more red for higher similarity)
            const color = getColorForWord(maxSimilarity);
  
            // Create colored span for the word
            coloredText.push(`<span style="color:${color}">${word}</span>`);
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
  
    // Process all elements, checking for visible text
    const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
    let processedNodeCount = 0;
  
    elements.forEach(async (element) => {
      // Process text nodes inside the element (and links)
      const textNodes = Array.from(element.childNodes).filter(child => child.nodeType === Node.TEXT_NODE);
      for (let textNode of textNodes) {
        await processTextNode(textNode);
        processedNodeCount++;
      }
    });
  
    console.log(`Finished processing. Total modified text nodes: ${processedNodeCount}`);
  })();
  