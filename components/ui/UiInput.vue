<style lang="scss">
  .help-text {
    display: block;
    font-weight: 400;
    font-size: .8em
  }
  input {
    accent-color: var(--primaryColor)
  }
  .label {
    .textarea,
    .input {
      margin-top: .5em
    }
    &:has(input[type='checkbox']) {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: .5rem;
      align-items: center;
      .control {
        grid-row: 1;
        grid-column: 1
      }
    }
  }
  .select-wrapper {
    position: relative;
    &:after {
      position: absolute;
      top: calc(50% - 2.5px);
      right: 10px;
      width: 10px;
      height: 10px;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      transform: rotate(45deg);
      content: ''
    }
  }
  .control.withPrefix {
    position: relative;
    &:before {
      position: absolute;
      top: .5em;
      left: 0;
      z-index: 1;
      display: inline-flex;
      width: 2rem;
      height: calc(100% - .5em);
      color: #363636;
      line-height: 1;
      text-align: center;
      content: var(--prefix);
      place-content: center;
      place-items: center
    }
    input {
      padding-left: 2rem
    }
  }
</style>

<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}<span v-if="help" class="help-text">({{ help }})</span>
      <div class="control" :class="{ withPrefix: prefix }" :style="prefix ? `--prefix: '${prefix}'`: ''">
        <textarea
          v-if="type === 'textarea'"
          v-model.trim="input"
          :name="name"
          class="textarea"
          v-bind="$attrs"
          :disabled="disabled"
          :required="required"
        />
        <div v-else-if="type === 'select'" class="select-wrapper">
          <select
            v-model="input"
            :name="name"
            class="input"
            v-bind="$attrs"
            :disabled="disabled"
            :required="required"
          >
            <template v-if="options.length > 0">
              <template v-for="option in options">
                <option :key="option" :value="option" v-text="option" />
              </template>
            </template>
            <slot />
          </select>
        </div>
        <input
          v-else-if="type === 'checkbox'"
          v-model="input"
          :type="type"
          :name="name"
          :disabled="disabled"
        >
        <input
          v-else-if="type === 'number'"
          v-model.trim="input"
          :type="type"
          step="0.01"
          :name="name"
          class="input"
          v-bind="$attrs"
          :disabled="disabled"
          :required="required"
          :pattern="pattern ? pattern : null"
          @keydown.enter="onEnter"
          @keyup="noSpacesFunction()"
        >
        <input
          v-else
          v-model.trim="input"
          :type="type"
          :name="name"
          class="input"
          v-bind="$attrs"
          :disabled="disabled"
          :required="required"
          :pattern="pattern ? pattern : null"
          @keydown.enter="onEnter"
          @keyup="noSpacesFunction()"
        >
        <button
          v-if="type === 'date'"
          type="button"
          class="button is-primary"
          :disabled="disabled"
          style="margin-top: .5em"
          @click="input = ''"
        >
          X
        </button>
      </div>
    </label>
  </div>
</template>

<script>
import field from '../mixins/field'
/**
 * @emits {KeyboardEvent} enter
 */
export default {
  extends: field,
  props: {
    type: {
      type: [String, Number],
      default: 'text'
    },
    options: {
      type: [Array],
      default () {
        return []
      }
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: ''
    },
    noSpaces: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    help: {
      type: String,
      default: null
    },
    prefix: {
      type: String,
      default: null
    }
  },
  mounted () {
    if (this.autofocus) {
      this.$el.querySelector('input, textarea, select').focus()
    }
  },
  methods: {
    onEnter ($event) {
      this.noSpacesFunction()
      this.$emit('enter', $event)
    },
    noSpacesFunction () {
      if (this.noSpaces) {
        if (this.input) {
          this.input = this.input.replaceAll(' ', '')
        }
      }
    }
  }
}
</script>
