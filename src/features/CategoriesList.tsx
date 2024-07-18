import { Link } from "react-router-dom";

//Files
import { GoBack } from "@/components";
import LoadingSkeleton from "@/components/LoadingSkeleton";

//Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { getCategories } from "@/state/Categories/categoriesSlice";

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
  const dispatch = useDispatch<AppDispatch>();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => dispatch(getCategories()),
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  type state = {
    category_name: string;
    exercises: [];
  };

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
            {categories?.payload.documents.map(
              ({ category_name, exercises }: state) => {
                return (
                  <TableRow key={category_name}>
                    <TableCell className="font-medium">
                      <Button variant={"link"} className="px-0" asChild>
                        <Link to={`./${category_name}`} state={{ exercises }}>
                          {category_name}
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Categories;
