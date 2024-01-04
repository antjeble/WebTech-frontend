import { describe, it, expect } from 'vitest'

import {flushPromises, mount, shallowMount} from '@vue/test-utils'
import DynamicForm from '../DynamicForm.vue'

describe('DynamicForm', () => {
  const emptyResponse: Plant[] = []
  const twoItemResponse: Plant[] = [
    { id: 1, name: 'Rose', duration: '5'},
    { id: 2, name: 'Tulpe', duration: '10'}]

  vi.mock('axios')

  it('should render the title passed to it', () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

    const title = 'My Title'
    const wrapper = shallowMount(DynamicForm, {
        props: { title }
        })
    expect(wrapper.text()).toMatch(title)
    })

  it('should render the items from the backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoItemResponse })

    const item = twoItemResponse[0].name
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(item)
  })

  it('should render message when no plant ist received from backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

    const message = 'No plants found'
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(message)
  })

})
