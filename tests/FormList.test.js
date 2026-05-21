import { mount } from '@vue/test-utils'
import FormList from '../src/components/FormList.vue'
import { ref } from 'vue'
import { vi } from 'vitest'

describe('FormList.vue', () => {
  const mockBus = {
    on: vi.fn(),
    emit: vi.fn()
  }

  const mockList = [
    {
      legend: 'Personal Info',
      customClasses: ['personal-info'],
      fields: [
        {
          label: 'Name',
          id: 'name',
          value: '',
          required: true
        },
        {
          label: 'Email',
          id: 'email',
          value: '',
          required: true
        }
      ]
    }
  ]

  it('renders correctly with props', () => {
    const wrapper = mount(FormList, {
      props: {
        list: mockList,
        eBus: mockBus,
        name: 'test-form'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.form-list').exists()).toBe(true)
    expect(wrapper.find('fieldset').exists()).toBe(true)
    expect(wrapper.find('legend').text()).toBe('Personal Info')
  })

  it('hides fields when hide method is called', async () => {
    const wrapper = mount(FormList, {
      props: {
        list: mockList,
        eBus: mockBus
      }
    })

    // Initially should have 2 fields
    const initialFields = wrapper.findAllComponents({ name: 'ChooseAField' })
    expect(initialFields.length).toBe(2)

    // Hide the name field
    await wrapper.vm.hide(['name'])

    // Should now have only 1 field (email)
    const afterHideFields = wrapper.findAllComponents({ name: 'ChooseAField' })
    expect(afterHideFields.length).toBe(1)
    expect(afterHideFields.at(0).props().field.id).toBe('email')
  })

  it('shows fields when show method is called', async () => {
    const wrapper = mount(FormList, {
      props: {
        list: mockList,
        eBus: mockBus
      }
    })

    // First hide all fields
    await wrapper.vm.hide(['name', 'email'])
    let hiddenFields = wrapper.findAllComponents({ name: 'ChooseAField' })
    expect(hiddenFields.length).toBe(0)

    // Then show only the name field
    await wrapper.vm.show(['name'])
    hiddenFields = wrapper.findAllComponents({ name: 'ChooseAField' })
    expect(hiddenFields.length).toBe(1)
    expect(hiddenFields.at(0).props().field.id).toBe('name')
  })

  it('filters fields correctly', () => {
    const wrapper = mount(FormList, {
      props: {
        list: mockList,
        eBus: mockBus
      }
    })

    // Filter to only required fields
    wrapper.vm.filter((field) => {
      return [true, field] // Keep all fields
    })

    const fields = wrapper.findAllComponents({ name: 'ChooseAField' })
    expect(fields.length).toBe(2)
  })
})