<template>
  <div class="donate bgimage blurred">
    <div class="container container-small">
      <div class="compact-hero mb-3">
        <nav class="nav compact-banner">
          <router-link :to="{ name: 'Splash' }" active-class="active" class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('splash.title') }}</router-link>
          <router-link :to="{ name: 'DonateForm' }" active-class="active" class="nav-link btn btn-outline-info btn-menu-c rounded-0">{{ $t('donate.title') }}</router-link>
        </nav>
      </div>

      <div class="list-group">
        <div class="single-card">
          <div class="list-group-item list-group-item-action flex-column align-items-start">

            <!-- Success State -->
            <div v-if="step === 'success'">
              <h5 class="mb-1">{{ $t('donate.thankYou') }}, {{ form.firstName }}.</h5>
              <p>{{ $t('donate.successMessage') }} <strong>${{ form.amount }}</strong>.</p>
              <p class="text-muted">{{ $t('donate.receiptNote') }} <strong>{{ form.email }}</strong>.</p>
              <div v-if="form.frequency === 'annual'" class="alert alert-info mt-2">
                {{ $t('donate.renewalNote') }}
              </div>
            </div>

            <!-- Form -->
            <div v-else>
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-3">{{ $t('donate.formTitle') }}</h5>
              </div>

              <!-- Frequency -->
              <div class="form-group">
                <label class="form-label-sm">{{ $t('donate.frequency') }}</label>
                <div class="btn-group d-block mb-2">
                  <button
                    :class="['btn btn-sm', form.frequency === 'once' ? 'btn-info' : 'btn-outline-info']"
                    @click="form.frequency = 'once'">{{ $t('donate.oneTime') }}</button>
                  <button
                    :class="['btn btn-sm', form.frequency === 'annual' ? 'btn-info' : 'btn-outline-info']"
                    @click="form.frequency = 'annual'">{{ $t('donate.annual') }}</button>
                </div>
              </div>

              <!-- Amount -->
              <div class="form-group">
                <label class="form-label-sm">{{ $t('donate.amount') }}</label>
                <div class="btn-group d-block mb-2">
                  <button
                    v-for="preset in presets"
                    :key="preset"
                    :class="['btn btn-sm', form.amount === preset && !customAmount ? 'btn-info' : 'btn-outline-info']"
                    @click="selectPreset(preset)"
                  >${{ preset }}</button>
                  <button
                    :class="['btn btn-sm', customAmount ? 'btn-info' : 'btn-outline-info']"
                    @click="activateCustom"
                  >{{ $t('donate.other') }}</button>
                </div>
                <div v-if="customAmount" class="input-group input-group-sm" style="max-width: 200px;">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <input
                    ref="customInput"
                    v-model="form.amount"
                    type="number"
                    min="1"
                    class="form-control"
                    :placeholder="$t('donate.enterAmount')"
                  />
                </div>
                <small v-if="form.frequency === 'annual' && form.amount" class="text-muted">
                  {{ $t('donate.annualNote', { amount: form.amount }) }}
                </small>
              </div>

              <!-- Personal Info -->
              <div class="form-group">
                <label class="form-label-sm">{{ $t('donate.yourInfo') }}</label>
                <div class="form-row">
                  <div class="col">
                    <input v-model="form.firstName" type="text" class="form-control form-control-sm mb-2" :placeholder="$t('donate.firstName')" />
                    <span v-if="errors.firstName" class="text-danger small">{{ errors.firstName }}</span>
                  </div>
                  <div class="col">
                    <input v-model="form.lastName" type="text" class="form-control form-control-sm mb-2" :placeholder="$t('donate.lastName')" />
                    <span v-if="errors.lastName" class="text-danger small">{{ errors.lastName }}</span>
                  </div>
                </div>
                <input v-model="form.email" type="email" class="form-control form-control-sm mb-2" :placeholder="$t('donate.email')" />
                <span v-if="errors.email" class="text-danger small d-block mb-2">{{ errors.email }}</span>
                <input v-model="form.address" type="text" class="form-control form-control-sm mb-2" :placeholder="$t('donate.address')" />
                <div class="form-row">
                  <div class="col">
                    <input v-model="form.city" type="text" class="form-control form-control-sm mb-2" :placeholder="$t('donate.city')" />
                  </div>
                  <div class="col-4">
                    <input v-model="form.postal" type="text" class="form-control form-control-sm mb-2" :placeholder="$t('donate.postal')" />
                  </div>
                </div>
              </div>

              <!-- Payment -->
              <div class="form-group">
                <label class="form-label-sm">{{ $t('donate.payment') }}</label>
                <div id="card-element" class="card-element form-control"></div>
                <span v-if="errors.card" class="text-danger small">{{ errors.card }}</span>
                <small class="text-muted">🔒 {{ $t('donate.securedByStripe') }}</small>
              </div>

              <!-- Submit -->
              <button
                class="btn btn-info"
                :disabled="processing"
                @click="submitDonation"
              >
                <span v-if="processing">...</span>
                <span v-else>
                  {{ form.frequency === 'annual'
                    ? $t('donate.giveAnnually', { amount: form.amount || '—' })
                    : $t('donate.donateNow', { amount: form.amount || '—' }) }}
                </span>
              </button>

              <span v-if="errors.submit" class="text-danger small ml-3">{{ errors.submit }}</span>

              <p class="text-muted small mt-3">{{ $t('donate.legal') }}</p>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import navigation from '@/components/Navigation';

  export default {
    name: 'DonateForm',
    components: { navigation },
    data() {
      return {
        step: 'form',
        processing: false,
        customAmount: false,
        stripe: null,
        cardElement: null,
        presets: [25, 50, 100, 250],
        form: {
          frequency: 'once',
          amount: 50,
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          postal: '',
        },
        errors: {},
      };
    },
    mounted() {
      this.loadStripe();
    },
    methods: {
      loadStripe() {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => this.initStripe();
        document.head.appendChild(script);
      },
      initStripe() {
        // Replace with your Stripe publishable key
        this.stripe = window.Stripe('pk_live_YOUR_PUBLISHABLE_KEY');
        const elements = this.stripe.elements();
        this.cardElement = elements.create('card', {
          style: {
            base: {
              fontSize: '14px',
              color: '#495057',
              '::placeholder': { color: '#6c757d' },
            },
            invalid: { color: '#dc3545' },
          },
        });
        this.cardElement.mount('#card-element');
      },
      selectPreset(amount) {
        this.form.amount = amount;
        this.customAmount = false;
      },
      activateCustom() {
        this.customAmount = true;
        this.form.amount = '';
        this.$nextTick(() => this.$refs.customInput.focus());
      },
      validate() {
        const e = {};
        if (!this.form.firstName.trim()) e.firstName = 'Required';
        if (!this.form.lastName.trim()) e.lastName = 'Required';
        if (!this.form.email.trim() || !/\S+@\S+\.\S+/.test(this.form.email)) e.email = 'Valid email required';
        if (!this.form.amount || Number(this.form.amount) < 1) e.card = 'Please enter a valid amount';
        this.errors = e;
        return Object.keys(e).length === 0;
      },
      async submitDonation() {
        if (!this.validate()) return;
        this.processing = true;
        this.errors = {};
        try {
          const { paymentMethod, error } = await this.stripe.createPaymentMethod({
            type: 'card',
            card: this.cardElement,
            billing_details: {
              name: `${this.form.firstName} ${this.form.lastName}`,
              email: this.form.email,
              address: {
                line1: this.form.address,
                city: this.form.city,
                postal_code: this.form.postal,
                country: 'CA',
              },
            },
          });
          if (error) {
            this.errors.card = error.message;
            this.processing = false;
            return;
          }
          const endpoint = this.form.frequency === 'annual'
            ? 'https://api.halifaxgreeks.ca/subscribe'
            : 'https://api.halifaxgreeks.ca/donate';

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentMethodId: paymentMethod.id,
              amount: Math.round(Number(this.form.amount) * 100),
              frequency: this.form.frequency,
              donor: {
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                email: this.form.email,
                address: this.form.address,
                city: this.form.city,
                postal: this.form.postal,
              },
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            this.errors.submit = data.message || 'Something went wrong. Please try again.';
            this.processing = false;
            return;
          }
          if (data.requiresAction) {
            const { error: confirmError } = await this.stripe.confirmCardPayment(data.clientSecret);
            if (confirmError) {
              this.errors.submit = confirmError.message;
              this.processing = false;
              return;
            }
          }
          this.step = 'success';
        } catch (err) {
          this.errors.submit = 'A network error occurred. Please try again.';
        } finally {
          this.processing = false;
        }
      },
    },
  };
</script>

<style scoped>
  .card-element {
    height: auto;
    padding: 8px 12px;
  }

  .form-label-sm {
    font-size: 80%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6c757d;
    display: block;
    margin-bottom: 6px;
  }

  /* Scope donation-specific button group wrapping to the donate component only */
  .donate .btn-group.d-block {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Ensure donation input groups don't overflow their container */
  .donate .input-group {
    max-width: 100%;
  }

  /* Compact banner styling: smaller banner and darker active state */
  /* Smaller banner strip */
  .compact-hero {
    margin-bottom: 0.5rem;
  }

  .compact-banner {
    background: rgba(255,255,255,0.75);
    padding: 6px 10px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.03);
    display: inline-block;
    margin-bottom: 8px;
  }

  .compact-banner .nav-link {
    margin-right: 6px;
    padding: 6px 10px;
    font-size: 0.95rem;
  }

  /* Force the compact banner nav to be horizontal (nav element has class 'compact-banner') */
  .compact-banner {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 6px;
    align-items: center;
  }

  /* Darker teal for active page indication */
  .compact-hero .nav-link.active,
  .compact-hero .nav-link:active {
    background-color: #0f6f77 !important;
    border-color: #0f6f77 !important;
    color: #fff !important;
  }

  .compact-hero .nav-link:hover {
    background-color: rgba(15,111,119,0.08);
    color: #0f6f77;
  }
</style>