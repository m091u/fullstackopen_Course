import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  //   screen.debug()

  //   const element = screen.getByText('Component testing is done with react-testing-library')
  //   expect(element).toBeDefined()
  render(<Note note={note} toggleImportance={mockHandler} />)
})
