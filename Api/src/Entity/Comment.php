<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
#[ApiResource]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $replayComments;

    #[ORM\Column(type: 'string', length: 60, nullable: true)]
    private $autor;

    #[ORM\ManyToOne(targetEntity: Movie::class, inversedBy: "comments")]
    private $movies;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getReplayComments(): ?string
    {
        return $this->replayComments;
    }

    public function setReplayComments(?string $replayComments): self
    {
        $this->replayComments = $replayComments;

        return $this;
    }

    public function getAutor(): ?string
    {
        return $this->autor;
    }

    public function setAutor(?string $autor): self
    {
        $this->autor = $autor;

        return $this;
    }

    /**
     * @return Movie|null
     */
    public function getMovies(): ?Movie
    {
        return $this->movies;
    }

    /**
     * @param Movie|null $movies
     * @return Comment
     */
    public function setMovies(?Movie $movies): self
    {
        $this->movies = $movies;

        return $this;
    }


}
