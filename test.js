// Test unitaire pour getTopProduct()
function getTopProduct(products) {
    if (!products || products.length === 0) return null;
    
    const counts = {};
    products.forEach(product => {
        const normalized = product.trim().toLowerCase();
        counts[normalized] = (counts[normalized] || 0) + 1;
    });
    
    let topProduct = '';
    let maxCount = 0;
    
    for (const [product, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            topProduct = product;
        }
    }
    
    return topProduct;
}

// Test demandé dans l'énoncé
function testScenario() {
    console.log("=== TEST UNITAIRE (scénario demandé) ===");
    console.log("Fonction testée: getTopProduct()");
    console.log("Données d'entrée: ['Pomme', 'poire', 'pomme']");
    
    const result = getTopProduct(["Pomme", "poire", "pomme"]);
    const expected = "pomme";
    
    console.log(`Résultat obtenu: "${result}"`);
    console.log(`Résultat attendu: "${expected}"`);
    
    if (result === expected) {
        console.log("✅ TEST RÉUSSI !");
        return { success: true, result: result, expected: expected };
    } else {
        console.log("❌ TEST ÉCHOUÉ");
        return { success: false, result: result, expected: expected };
    }
}

// Exécute le test automatiquement
const testResult = testScenario();

// Pour utilisation dans le navigateur
if (typeof window !== 'undefined') {
    window.testResult = testResult;
    window.getTopProduct = getTopProduct;
    window.testScenario = testScenario;
}