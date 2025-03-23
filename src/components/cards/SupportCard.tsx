import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

interface SupportCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    icon?: string;
}

const SupportCard: React.FC<SupportCardProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    icon = "/images/png/support.png", // Default icon (replace with actual path)
}) => {
    return (
        <Card className="flex flex-row gap-3 p-6 items-center">


            {/* Support Icon */}

            <Avatar>
                <AvatarImage src={icon} alt={"support"} />

            </Avatar>
            <div className="flex flex-col justify-start items-start">

                {/* Title */}
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>

                {/* Description */}
                <CardDescription className=" text-sm text-left">{description}</CardDescription>

                {/* Button */}
                <Link
                    href={buttonLink}

                ><Button variant={"default"}>

                        {buttonText}
                    </Button>
                </Link>

            </div>

        </Card>
    );
};

export default SupportCard;
