import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Workspace', () => {
  it('opens Overview with a zero counter and only one visible panel', () => {
    render(<App />)

    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Count is 0' })).toBeVisible()
  })

  it.each([
    ['Documentation', 'Documentation', 'Explore Vite'],
    ['Community', 'Connect with us', 'GitHub'],
  ])('switches to %s and hides the previous panel', async (tab, heading, link) => {
    const user = userEvent.setup()
    render(<App />)
    const overview = screen.getByRole('tabpanel', { name: 'Overview' })

    await user.click(screen.getByRole('tab', { name: tab }))

    const panel = screen.getByRole('tabpanel', { name: tab })
    expect(panel).toBeVisible()
    expect(within(panel).getByRole('heading', { name: heading })).toBeVisible()
    expect(within(panel).getByRole('link', { name: link })).toBeVisible()
    expect(overview).not.toBeVisible()
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByRole('tab', { name: tab })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false')
  })

  it('increments the counter by one for each click', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Count is 0' }))
    expect(screen.getByRole('button', { name: 'Count is 1' })).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Count is 1' }))
    expect(screen.getByRole('button', { name: 'Count is 2' })).toBeVisible()
  })

  it('returns home using the Workspace link without resetting the counter', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Count is 0' }))
    await user.click(screen.getByRole('tab', { name: 'Community' }))
    await user.click(screen.getByRole('link', { name: 'Workspace' }))

    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Count is 1' })).toBeVisible()
  })

  it('supports arrow keys, wrapping, Home and End with matching focus and content', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('tab', { name: 'Overview' }))

    for (const [key, name] of [
      ['{ArrowRight}', 'Documentation'],
      ['{ArrowRight}', 'Community'],
      ['{ArrowRight}', 'Overview'],
      ['{ArrowLeft}', 'Community'],
      ['{Home}', 'Overview'],
      ['{End}', 'Community'],
    ]) {
      await user.keyboard(key)
      const selected = screen.getByRole('tab', { name })
      expect(selected).toHaveFocus()
      expect(selected).toHaveAttribute('aria-selected', 'true')
      expect(selected).toHaveAttribute('tabindex', '0')
      expect(screen.getByRole('tabpanel', { name })).toBeVisible()
      expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
      for (const tab of screen.getAllByRole('tab').filter((tab) => tab !== selected)) {
        expect(tab).toHaveAttribute('tabindex', '-1')
        expect(tab).toHaveAttribute('aria-selected', 'false')
      }
    }
  })
})
