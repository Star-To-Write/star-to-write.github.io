import { Department } from "@/lib/types";

export function DepartmentCard({ department }: { department: Department }) {
    return (
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 mb-12">
            <div className="text-center mb-8">
                <h3
                    className="text-2xl mb-2 text-[#d4af37]"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    {department.name}
                </h3>

                <p className="text-muted-foreground">
                    {department.description}
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {department.members.map((member, index: number) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-xl p-6 border border-[#d4af37]/10 text-center hover:bg-[#d4af37]/10 transition-all duration-300"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">{member.emoji}</span>
                        </div>

                        <h4
                            className="text-lg mb-1 text-[#d4af37]"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            {member.name}
                        </h4>

                        <p className="text-sm text-[#d4af37]/80 mb-2">
                            {member.role}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {member.bio}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
