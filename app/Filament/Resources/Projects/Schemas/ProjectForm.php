<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Set;
use Illuminate\Support\Str;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->required()
                    ->native(false),
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('client'),
                DatePicker::make('project_date'),
                Textarea::make('description')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),
                RichEditor::make('process_breakdown')
                    ->columnSpanFull(),
                Select::make('tools')
                    ->multiple()
                    ->relationship('tools', 'name')
                    ->preload()
                    ->native(false)
                    ->required(),
                TextInput::make('video_url')
                    ->label('Video Preview URL (Optional MP4)')
                    ->url()
                    ->placeholder('https://example.com/video.mp4')
                    ->columnSpanFull(),
                SpatieMediaLibraryFileUpload::make('hero_media')
                    ->collection('hero_media')
                    ->label('Hero Media (Image or Video)')
                    ->required()
                    ->columnSpanFull(),
                SpatieMediaLibraryFileUpload::make('gallery')
                    ->collection('gallery')
                    ->multiple()
                    ->label('Gallery Images')
                    ->columnSpanFull(),
                Toggle::make('featured')
                    ->label('Featured Project')
                    ->default(false),
            ]);
    }
}
