import { Link } from "react-router-dom";
//Files
import { customFetch } from "@/utils/customFetch";
import { GoBack } from "@/components";
import LoadingSkeleton from "@/components/LoadingSkeleton";

//UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

//React-Query
import { useQuery } from "react-query";

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => customFetch.get("/targetList"),
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <GoBack />
      <div className="container px-8 my-8">
        <Table className="mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>Categories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.data.map((category: string) => {
              return (
                <TableRow key={category}>
                  <TableCell className="font-medium">
                    <Button variant={"link"} asChild>
                      <Link to={`./${category}`}>{category.toUpperCase()}</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Categories;
