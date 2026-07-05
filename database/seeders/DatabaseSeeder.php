<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Tool;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User for Filament
        User::updateOrCreate(
            ['email' => 'admin@porto.com'],
            [
                'name' => 'Admin Designer',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Create 2 Categories
        $categories = [
            'Desain Grafis' => 'desain-grafis',
            'Motion Graphics' => 'motion-graphics'
        ];

        $categoryModels = [];
        foreach ($categories as $name => $slug) {
            $categoryModels[$name] = Category::updateOrCreate(
                ['slug' => $slug],
                ['name' => $name]
            );
        }

        // 3. Create Tools with SVG Logos
        $tools = [
            [
                'name' => 'Adobe After Effects',
                'logo_svg' => '<svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-[#9999FF]"><rect width="24" height="24" rx="4" fill="#131332" stroke="#9999FF" stroke-width="1.5"/><text x="4.5" y="16" fill="#9999FF" font-family="system-ui, sans-serif" font-weight="bold" font-size="11px">Ae</text></svg>'
            ],
            [
                'name' => 'Adobe Premiere Pro',
                'logo_svg' => '<svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-[#FF99FF]"><rect width="24" height="24" rx="4" fill="#321332" stroke="#FF99FF" stroke-width="1.5"/><text x="5" y="16" fill="#FF99FF" font-family="system-ui, sans-serif" font-weight="bold" font-size="11px">Pr</text></svg>'
            ],
            [
                'name' => 'Adobe Photoshop',
                'logo_svg' => '<svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-[#99CCFF]"><rect width="24" height="24" rx="4" fill="#132B40" stroke="#99CCFF" stroke-width="1.5"/><text x="5.5" y="16" fill="#99CCFF" font-family="system-ui, sans-serif" font-weight="bold" font-size="11px">Ps</text></svg>'
            ],
            [
                'name' => 'Figma',
                'logo_svg' => '<svg viewBox="0 0 24 24" fill="none" class="w-10 h-10"><rect width="24" height="24" rx="4" fill="#1E1E1E" stroke="#F24E1E" stroke-width="1.5"/><path d="M9.5 7.5a1.5 1.5 0 1 1 3 0v1.5h-3V7.5zM9.5 10.5a1.5 1.5 0 1 1 3 0V12h-3v-1.5zM9.5 13.5a1.5 1.5 0 1 1 1.5 1.5h-1.5v-1.5zM12.5 10.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 1 1 0 3h-1v-1.5zM12.5 7.5a1.5 1.5 0 0 1 3 0 1.5 1.5 0 0 1-3 0z" fill="#FFF"/></svg>'
            ],
            [
                'name' => 'CapCut',
                'logo_svg' => '<svg viewBox="0 0 24 24" fill="none" class="w-10 h-10 text-white"><rect width="24" height="24" rx="4" fill="#000" stroke="#39FF14" stroke-width="1.5"/><path d="M7 7h4v4H7V7zm6 6h4v4h-4v-4z" fill="#39FF14"/><circle cx="9" cy="15" r="2" fill="#FF5722"/><circle cx="15" cy="9" r="2" fill="#39FF14"/></svg>'
            ],
        ];

        $toolModels = [];
        foreach ($tools as $t) {
            $toolModels[$t['name']] = Tool::updateOrCreate(
                ['name' => $t['name']],
                ['logo_svg' => $t['logo_svg']]
            );
        }

        // 4. Custom Projects Data using user's uploaded images and videos
        $projectsData = [
            // --- DESAIN GRAFIS (FOTO SAJA) ---
            [
                'title' => 'Teka Teki Impian',
                'category' => 'Desain Grafis',
                'client' => 'Kementerian Pendidikan dan Kebudayaan',
                'project_date' => '2026-06-28',
                'description' => 'Desain cover buku novel "Teka Teki Impian" dengan komposisi visual puzzle kreatif.',
                'process_breakdown' => '### Konsep Visual\nMenciptakan ilustrasi tangan menyusun kepingan teka-teki (puzzle).',
                'video_url' => null,
                'featured' => true,
                'tools' => ['Adobe Photoshop', 'Figma'],
                'image_path' => '/images/image1.png'
            ],
            [
                'title' => 'Lawan Narkoba Dengan Prestasi',
                'category' => 'Desain Grafis',
                'client' => 'Badan Narkotika Nasional',
                'project_date' => '2026-06-20',
                'description' => 'Poster infografis edukatif bertema "Lawan Narkoba dengan Prestasi".',
                'process_breakdown' => '### Strategi Layout\nMenggunakan grid infografis yang bersih.',
                'video_url' => null,
                'featured' => true,
                'tools' => ['Adobe Photoshop', 'Figma'],
                'image_path' => '/images/image2.png'
            ],
            [
                'title' => 'Open Loker Graphic Designer',
                'category' => 'Desain Grafis',
                'client' => 'Nusantara Cipta',
                'project_date' => '2026-06-15',
                'description' => 'Poster lowongan kerja (recruitment flyer) posisi Graphic Designer.',
                'process_breakdown' => '### Komposisi Visual\nMenempatkan ilustrasi fotografer di bagian tengah.',
                'video_url' => null,
                'featured' => false,
                'tools' => ['Figma', 'Adobe Photoshop'],
                'image_path' => '/images/image4.png'
            ],
            [
                'title' => 'Surrealist Editorial Collage',
                'category' => 'Desain Grafis',
                'client' => 'Vogue Indonesia (Mockup)',
                'project_date' => '2026-01-20',
                'description' => 'Eksperimen manipulasi foto surealis untuk sampul majalah mode.',
                'process_breakdown' => '### Teknik Masking\nMelakukan seleksi rambut tingkat lanjut.',
                'video_url' => null,
                'featured' => false,
                'tools' => ['Adobe Photoshop', 'Figma'],
                'image_path' => '/images/image3.jpeg'
            ],

            // --- MOTION GRAPHICS (VIDEO AUTO-PLAY) ---
            [
                'title' => 'Round Slide Transition Tutorial',
                'category' => 'Motion Graphics',
                'client' => 'Motion Academy',
                'project_date' => '2026-06-25',
                'description' => 'Video tutorial penyuntingan motion graphics transisi bundar.',
                'process_breakdown' => '### Pembuatan Motion\nMenggunakan teknik shape path animation lingkaran.',
                'video_url' => '/videos/video1.mp4',
                'featured' => true,
                'tools' => ['Adobe After Effects', 'CapCut'],
                'image_path' => '/images/image3.jpeg'
            ],
            [
                'title' => 'Cyberpunk Streetwear Promo',
                'category' => 'Motion Graphics',
                'client' => 'Neo Tokyo Apparel',
                'project_date' => '2026-03-15',
                'description' => 'Sebuah video promosi berkecepatan tinggi lini pakaian jalanan.',
                'process_breakdown' => '### Penyuntingan Video\nMenggunakan teknik pemotongan ritmis.',
                'video_url' => '/videos/video2.mp4',
                'featured' => true,
                'tools' => ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'],
                'image_path' => '/images/image1.png'
            ],
            [
                'title' => 'Abstract 3D Shape Morphing',
                'category' => 'Motion Graphics',
                'client' => 'Museum Seni Digital',
                'project_date' => '2026-04-10',
                'description' => 'Instalasi seni generatif yang mengeksplorasi metamorfosis bentuk.',
                'process_breakdown' => '### Proses Pembuatan\nMemanfaatkan mesin partikel dan shader kustom.',
                'video_url' => '/videos/video3.mp4',
                'featured' => false,
                'tools' => ['Adobe After Effects', 'Figma'],
                'image_path' => '/images/image2.png'
            ],
            [
                'title' => 'Cinematic Iceland Travel',
                'category' => 'Motion Graphics',
                'client' => 'Personal Project',
                'project_date' => '2025-11-12',
                'description' => 'Video dokumenter perjalanan pendek pemandangan megah Islandia.',
                'process_breakdown' => '### Grading Warna\nMenerapkan grading warna bernuansa dingin.',
                'video_url' => '/videos/video4.mp4',
                'featured' => false,
                'tools' => ['Adobe Premiere Pro', 'Adobe After Effects'],
                'image_path' => '/images/image4.png'
            ]
        ];

        foreach ($projectsData as $data) {
            $catId = $categoryModels[$data['category']]->id;
            
            $project = Project::updateOrCreate(
                ['slug' => Str::slug($data['title'])],
                [
                    'category_id' => $catId,
                    'title' => $data['title'],
                    'client' => $data['client'],
                    'project_date' => $data['project_date'],
                    'description' => $data['description'],
                    'process_breakdown' => $data['process_breakdown'],
                    'video_url' => $data['video_url'],
                    'image_path' => $data['image_path'],
                    'featured' => $data['featured'],
                ]
            );

            // Attach tools
            $tIds = [];
            foreach ($data['tools'] as $tName) {
                if (isset($toolModels[$tName])) {
                    $tIds[] = $toolModels[$tName]->id;
                }
            }
            $project->tools()->sync($tIds);
        }
    }
}
