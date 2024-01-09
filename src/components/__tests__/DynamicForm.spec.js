import { describe, it, expect, vi } from 'vitest'

import {shallowMount, flushPromises} from '@vue/test-utils'
import DynamicForm from '../DynamicForm.vue'
import axios from "axios";

describe('DynamicForm', () => {
  const emptyResponse = []
  const oneItemResponse = [
    { name: 'Rose', duration: '5'}]
  const twoItemResponse = [
    { name: 'Rose', duration: '5'},
    { name: 'Tulpe', duration: '10'}]

  vi.mock('axios')

  it('should render the title passed to it', () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: emptyResponse })

    const title = 'My Title'
    const wrapper = shallowMount(DynamicForm, {
        props: { title }
        })
    expect(wrapper.text()).toMatch(title)
    })

  it('should render one plant from the backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: oneItemResponse })

    const item = oneItemResponse[0].name
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(item)
  })

  it('should render multiple plants from the backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: twoItemResponse })

    const item = twoItemResponse[0].name
    const wrapper = shallowMount(DynamicForm)

    await flushPromises()

    expect(wrapper.text()).toContain(item)
  })

})
