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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function App() {
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
              <form className='space-y-4'>
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
                  <Button type='submit'>Submit</Button>
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
                <TableRow>
                  <TableCell>Fanta</TableCell>
                  <TableCell>Rp. 3000</TableCell>
                  <TableCell>Minuman</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sprite</TableCell>
                  <TableCell>Rp. 3000</TableCell>
                  <TableCell>Minuman</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Taro</TableCell>
                  <TableCell>Rp. 5000</TableCell>
                  <TableCell>Makanan</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Pagination className='justify-end mt-4'>
              <PaginationContent>
                <PaginationItem>
                  <Button>Previous</Button>
                </PaginationItem>
                <PaginationItem>1</PaginationItem>
                <PaginationItem>
                  <Button> Next</Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </>
  )
}
