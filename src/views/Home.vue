<template>
    <section class="main-content container h-full m-auto flex align-center justify-center">
        <div class="content-holder w-full sm:w-2/3 mx-auto py-8 flex flex-col sm:flex-row justify-center">
            <div class="content w-full sm:w-2/3 mx-0 sm:mx-4 p-6">
                <div class="app-title mb-8 flex flex-col">
                    <h2 class="text-2xl font-bold">Mortgage Calculator</h2>
                    <p>Fixed Monthly Payment</p>
                </div>
                <div class="mb-4">
                    <label class="flex justify-between">Purchase Price: <span class="font-medium">${{ price }}</span></label>
                    <input 
                        v-model="price"
                        type="range" id="price" name="price" min="0" max="10000000" step="5000"
                        class="range w-full mr-4"
                    >
                </div>
                <div class="mb-4">
                    <label class="flex justify-between">Downpayment: <span class="font-medium">${{ downpayment }}</span></label>
                    <input 
                        v-model="downpayment"
                        type="range" id="downpayment" name="downpayment" min="0" max="2000000" step="5000"
                        class="range w-full"
                    >
                </div>
                <div class="mb-4">
                    <label class="flex justify-between">No. of Years: <span class="font-medium">{{ periods }} years</span></label>
                    <input 
                        v-model="periods"
                        type="range" id="periods" name="periods" min="0" max="25"
                        class="range w-full"
                    >
                </div>
                <div class="mb-4">
                    <label class="flex justify-between">Interest Rate: <span class="font-medium">{{ interest }}%</span></label>
                    <input 
                        v-model="interest"
                        type="range" id="interest" name="interest" min="0" max="25"
                        class="range w-full"
                    >
                </div>
                <div 
                    v-if="isValid"
                    class="errorMessage w-full mt-6 py-2 px-4 bg-warning-20 rounded">
                    <p class="text-warning-100">Values should not be zero(0).</p>
                </div>
                <div class="mt-6 flex justify-start items-center">
                    <button 
                        @click="getQuote"
                        :disabled="isEnable"
                        :class="{ disabled : isEnable }"
                        class="py-4 px-6 bg-accent-100 hover:bg-accent-200 rounded text-light-100 ease-out transition-all">Get Mortgage Quote
                    </button>
                    <button 
                        @click="tryAgain"
                        v-if="isValid"
                        class="py-4 pl-6 text-accent-100 ease-out transition-all">Try again
                    </button>
                </div>
            </div>
            <div class="content w-full sm:w-1/3 sm:mx-0 px-4 sm:p-0">
                <div class="mx-2 sm:mx-4 p-6 flex flex-col bg-accent-50 rounded">
                    <div class="pb-3 border-b border-b-gray-100">
                        <h2 class="text-2xl font-bold">Summary</h2>
                    </div>
                    <div class="mt-4">
                        <p class="font-medium">Outstanding Loan Balance</p>
                        <h2 class="font-bold text-3xl text-accent-100">${{ P }}</h2>
                    </div>
                    <div class="mt-4">
                        <p class="font-medium">Fixed Monthly Payment</p>
                        <h2 class="font-bold text-3xl text-accent-100">${{ M }}</h2>
                    </div>
                    <div class="mt-4">
                        <p class="text-sm">This is the estimated monthly payment based on a ${{ P }} loan amount with a {{ interest }}% fixed monthly interest rate for the entire duration of the loan ({{ periods }} years).</p>
                    </div>
                    <div
                        v-if="isVisible" 
                        class="mt-6">
                        <button
                            @click="resetQuote"
                            class="py-4 px-6 bg-accent-100 hover:bg-accent-200 rounded text-light-100 ease-out transition-all"
                            >Reset Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const M = ref(0);
const P = ref(0);
const price = ref(0);
const downpayment = ref(0);
const periods = ref(0);
const interest = ref(0);

const isValid = ref(false);
const isVisible = ref(false);
const isEnable = ref(false);

// Mortage Fixed Monthly Payment Formula
// M = P * r * ((1+r)**n) / ((1+r)**n)-1)
// r - monthly interest rate (r = % / 12 months)
// n - in months (n = 5yrs * 12)

const computeMortgage = () => {
    const monthlyInterestRate = (interest.value / 100) / 12;
    const noOfPeriods = periods.value * 12;
    const dividend = ((1 + monthlyInterestRate) ** noOfPeriods).toFixed(4)
    const divisor = (((1 + monthlyInterestRate) ** noOfPeriods ) - 1).toFixed(4)
    
    P.value = price.value - downpayment.value
    M.value = (P.value * monthlyInterestRate * (dividend / divisor)).toFixed(2);

    // Format number with commas
    const numberFormatter = Intl.NumberFormat('en-US');
    M.value = numberFormatter.format(M.value);
    P.value = numberFormatter.format(P.value);
}

const getQuote = () => {
    if (price.value === 0 || downpayment.value === 0 || periods.value === 0 || interest === 0) {
        isValid.value = !isValid.value;
        isEnable.value = !isEnable.value;
    } else {
        computeMortgage()
        isVisible.value = !isVisible.value;
        isEnable.value = !isEnable.value;
    }
}

const tryAgain = () => {
    isValid.value = !isValid.value;
    isEnable.value = !isEnable.value;
    resetValue();
}

const resetQuote = () => {
    isVisible.value = !isVisible.value;
    isEnable.value = !isEnable.value;
    resetValue();
}

const resetValue = () => {
    const inputRange = document.querySelectorAll('.range')
    inputRange.forEach(el => {
        if (el.value !== 0) {
            price.value = 0;
            downpayment.value = 0;
            periods.value = 0;
            interest.value = 0;
            P.value = 0;
            M.value = 0; 
        }
    })
}

</script>

<style scoped>
.disabled {
    background-color: #dfdfdf;
    color: #999999;
}
</style>