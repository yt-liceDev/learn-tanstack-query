import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { FormEvent, useState } from "react"

type Product = {
  id: string
  name: string
  price: number
  category: string
}

const getProducts = async (page: number) => {
  const res = await fetch("http://localhost:8000/api/v1/product?page=" + page)

  if (!res.ok) {
    throw Error("fail to fetching")
  }

  return await res.json()
}

const addProduct = async (product: unknown) => {
  const res = await fetch("http://localhost:8000/api/v1/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })

  return await res.json()
}

export default function App() {
  const [page, setPage] = useState(1)

  const { data, isPending, error, isFetching } = useQuery({
    queryKey: ["product", page],
    queryFn: () => getProducts(page),
    placeholderData: keepPreviousData,
  })

  const query = useQueryClient()
  const mutation = useMutation({ mutationFn: addProduct })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const product = Object.fromEntries(formData)

    mutation.mutate(product, {
      onSuccess() {
        form.reset()
        query.invalidateQueries({ queryKey: ["product"] })
      },
    })
  }

  return (
    <>
      <nav className='py-4 px-8 h-14 border-b border-b-slate-200 shadow-sm'>
        <h1 className='text-lg'>Inventory</h1>
      </nav>
      <main className='w-[80svw] mx-auto py-8'>
        <section className='grid grid-cols-3 gap-x-8 gap-y-4'>
          <Card className='h-max'>
            <CardHeader>
              <CardTitle>Add Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Name :</Label>
                  <Input type='text' id='name' name='name' placeholder='Name' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='price'>Price :</Label>
                  <Input type='text' id='price' name='price' placeholder='Price' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='category'>Category :</Label>
                  <Select name='category'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Category' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='makanan'>Makanan</SelectItem>
                      <SelectItem value='minuman'>Minuman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='text-end'>
                  <Button type='submit' disabled={mutation.isPending}>
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className='col-span-2'>
            <h1 className='text-xl mb-4 font-semibold'>List Products</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending || isFetching ? (
                  <TableRow>
                    <TableCell>
                      <Skeleton className='w-16 h-4 bg-zinc-300 rounded-md' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='w-16 h-4 bg-zinc-300 rounded-md' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='w-16 h-4 bg-zinc-300 rounded-md' />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <p>{error.message}</p>
                ) : (
                  data?.products?.map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("id", {
                          style: "currency",
                          currency: "idr",
                          maximumFractionDigits: 0,
                        }).format(product.price)}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <Pagination className='justify-end mt-4'>
              <PaginationContent>
                <PaginationItem>
                  <Button onClick={() => setPage((old) => old - 1)} disabled={page === 1}>
                    Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>{page}</PaginationItem>
                <PaginationItem>
                  <Button
                    onClick={() => setPage((old) => old + 1)}
                    disabled={page === data?.totalPage}
                  >
                    Next
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </>
  )
}
