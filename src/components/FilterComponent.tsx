import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FilterComponent = ({
    title,
    filters,
    value,
    setValue,
}: {
    title: string;
    filters: string[];
    value: string;
    setValue: (value: string) => void;
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="" asChild>
                <Button
                    variant="outline"
                    className="border-[#6a7282] text-white hover:bg-[#101828] hover:text-white transition-colors"
                >
                    {title}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-32 bg-[#131313] border border-[#6a7282] shadow-lg rounded-lg">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-white font-semibold">
                        Choose option
                    </DropdownMenuLabel>

                    <DropdownMenuRadioGroup
                        value={value}
                        onValueChange={(newValue) => {
                            setValue(newValue);
                        }}
                    >
                        {filters.map((val) => (
                            <DropdownMenuRadioItem
                                key={val}
                                value={val}
                                className="text-[#6a7282] hover:text-white hover:bg-[#101828] focus:bg-[#101828] focus:text-white cursor-pointer"
                            >
                                {val}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
