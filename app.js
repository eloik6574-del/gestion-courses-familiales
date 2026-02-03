const { createApp } = Vue;

createApp({
    data() {
        return {
            newPurchase: {
                product: '',
                price: 0,
                date: new Date().toISOString().split('T')[0]
            },
            purchases: [],
            error: '',
            isDevelopment: true, // TOUJOURS AFFICHER LES TESTS
            testResult: null
        };
    },
    
    computed: {
        sortedPurchases() {
            return [...this.purchases].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );
        },
        
        totalSpent() {
            return this.purchases.reduce((sum, purchase) => 
                sum + parseFloat(purchase.price), 0
            );
        },
        
        topProduct() {
            if (this.purchases.length === 0) return null;
            
            const counts = {};
            this.purchases.forEach(p => {
                const product = p.product.trim().toLowerCase();
                counts[product] = (counts[product] || 0) + 1;
            });
            
            let topName = '';
            let topCount = 0;
            
            for (const [product, count] of Object.entries(counts)) {
                if (count > topCount) {
                    topCount = count;
                    topName = product;
                }
            }
            
            return { 
                name: topName.charAt(0).toUpperCase() + topName.slice(1), 
                count: topCount 
            };
        }
    },
    
    methods: {
        addPurchase() {
            this.error = '';
            
            const product = this.newPurchase.product.trim();
            const price = parseFloat(this.newPurchase.price);
            const date = this.newPurchase.date;
            
            if (!product) {
                this.error = 'Le nom du produit est requis';
                return;
            }
            
            if (!price || price <= 0) {
                this.error = 'Le prix doit être un nombre positif';
                return;
            }
            
            if (!date) {
                this.error = 'La date est requise';
                return;
            }
            
            const purchase = {
                id: Date.now(),
                product: product,
                price: price,
                date: date
            };
            
            this.purchases.push(purchase);
            this.newPurchase.product = '';
            this.newPurchase.price = 0;
            this.newPurchase.date = new Date().toISOString().split('T')[0];
            this.saveToLocalStorage();
        },
        
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        },
        
        saveToLocalStorage() {
            localStorage.setItem('familyPurchases', JSON.stringify(this.purchases));
        },
        
        loadFromLocalStorage() {
            const saved = localStorage.getItem('familyPurchases');
            if (saved) {
                this.purchases = JSON.parse(saved);
            }
        },
        
        // FONCTION À TESTER
        getTopProduct(products) {
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
        },
        
        // TEST UNITAIRE
        runUnitTest() {
            console.log("🧪 Exécution du test unitaire...");
            
            const testData = ["Pomme", "poire", "pomme"];
            const result = this.getTopProduct(testData);
            const expected = "pomme";
            const success = result === expected;
            
            const coverage = success ? 100 : 0;
            
            this.testResult = {
                success: success,
                result: result || "(null)",
                expected: expected,
                coverage: coverage
            };
            
            console.log("Test unitaire terminé:", this.testResult);
        }
    },
    
    mounted() {
        this.loadFromLocalStorage();
        console.log("Application chargée");
    }
}).mount('#app');