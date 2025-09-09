import { randomUUID } from 'node:crypto'
import { InMemoryRepository } from './in-memoryRepository'
import { NotFoundError } from '../errors/not-found-error'

type StubModelProps = {
  id: string
  name: string
  price: number
  created_at: Date
  updated_at: Date
}

class StubInMemoryRepository extends InMemoryRepository<StubModelProps> {
  constructor() {
    super()
    this.sortableFields = ['name']
  }

  protected async applyFilter(
    items: StubModelProps[],
    filter: string | null,
  ): Promise<StubModelProps[]> {
    if (!filter) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository
  let model: StubModelProps
  let props: any
  let created_at: Date
  let updated_at: Date

  beforeEach(() => {
    sut = new StubInMemoryRepository()
    created_at = new Date()
    updated_at = new Date()

    props = {
      name: 'test name',
      price: 10,
    }

    model = {
      id: randomUUID(),
      created_at,
      updated_at,
      ...props,
    }
  })

  it('Should creaste a new model', () => {
    const result = sut.create(props)
    expect(result.name).toStrictEqual(model.name)
  })

  it('Should inserts a new model', async () => {
    const result = await sut.insert(model)
    expect(result).toStrictEqual(sut.items[0])
  })

  it('Should throw error when id not found', async () => {
    await expect(sut.findById('fake_id')).rejects.toThrow(
      new NotFoundError('Model not found using ID fake_id'),
    )
  })

  it('Should find a model by id', async () => {
    const data = await sut.insert(model)
    const result = await sut.findById(data.id)
    expect(result).toStrictEqual(data)
  })
})
