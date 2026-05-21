import { mount } from '@vue/test-utils'
import ChooseAField from '../src/components/ChooseAField.vue'
import FTextInput from '../src/components/FTextInput.vue'
import FSelect from '../src/components/FSelect.vue'
import { vi } from 'vitest'

describe('ChooseAField.vue', () => {
  it('renders FTextInput when field has no options', () => {
    const field = {
      label: 'Name',
      id: 'name',
      value: '',
      required: true
    }

    const wrapper = mount(ChooseAField, {
      props: {
        field: field
      }
    })

    expect(wrapper.findComponent(FTextInput).exists()).toBe(true)
    expect(wrapper.findComponent(FSelect).exists()).toBe(false)
  })

  it('renders FSelect when field has options', () => {
    const field = {
      label: 'Favorite Fruit',
      id: 'fruit',
      value: '',
      options: ['Apple', 'Banana', 'Cherry']
    }

    const wrapper = mount(ChooseAField, {
      props: {
        field: field
      }
    })

    expect(wrapper.findComponent(FSelect).exists()).toBe(true)
    expect(wrapper.findComponent(FTextInput).exists()).toBe(false)
  })

  it('passes field and eBus props to child component', () => {
    const field = {
      label: 'Email',
      id: 'email',
      value: 'test@example.com',
      required: true
    }

    const eBus = { on: vi.fn(), emit: vi.fn() }

    const wrapper = mount(ChooseAField, {
      props: {
        field: field,
        eBus: eBus
      }
    })

    // The child component should receive the field prop
    const textInput = wrapper.findComponent(FTextInput)
    expect(textInput.props().field).toEqual(field)
    expect(typeof textInput.props().eBus.on).toBe('function')
    expect(typeof textInput.props().eBus.emit).toBe('function')
  })
})